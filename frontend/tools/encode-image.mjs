// Generate the web derivatives for one or more image directories.
//
// Each directory holds a master photo named 100.jpg or 100.png (the
// bin/resize-img convention). From the master this writes, per tier
// (100, 50, 25):
//   <tier>.webp  - WebP, quality 80
//   <tier>.avif  - AVIF, quality 57
// and for JPEG masters it also re-encodes the 50 and 25 JPEG tiers
// with MozJPEG (quality 82). The 100 master itself is never touched.
//
// Usage:
//   node tools/encode-image.mjs <dir> [<dir> ...]
//   node tools/encode-image.mjs --all   (every photo under src/assets/img/projects)

import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WEBP_QUALITY = 80;
const AVIF_QUALITY = 57;
const JPEG_QUALITY = 82;
const TIERS = [100, 50, 25];

const projectsRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "assets",
  "img",
  "projects",
);

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

const masterIn = async (dir) => {
  for (const ext of ["jpg", "png"]) {
    const candidate = path.join(dir, `100.${ext}`);
    if (await exists(candidate)) return { file: candidate, ext };
  }
  return null;
};

const findImageDirs = async (dir) => {
  const found = [];
  if (await masterIn(dir)) found.push(dir);
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      found.push(...(await findImageDirs(path.join(dir, entry.name))));
    }
  }
  return found;
};

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

const encodeDir = async (dir) => {
  const master = await masterIn(dir);
  if (!master) {
    console.error(`skipping ${dir}: no 100.jpg or 100.png master`);
    return;
  }
  const derivativeNames = TIERS.flatMap((tier) => [
    `${tier}.webp`,
    `${tier}.avif`,
  ]);
  const allPresent = (
    await Promise.all(
      derivativeNames.map((name) => exists(path.join(dir, name))),
    )
  ).every(Boolean);
  if (allPresent) {
    console.log(`skipping ${dir}: derivatives already exist`);
    return;
  }
  const meta = await sharp(master.file).metadata();
  const jobs = [];
  for (const tier of TIERS) {
    const width = Math.max(1, Math.round((meta.width * tier) / 100));
    const base = () =>
      sharp(master.file).rotate().resize({ width, withoutEnlargement: true });
    jobs.push(
      base()
        .webp({ quality: WEBP_QUALITY })
        .toFile(path.join(dir, `${tier}.webp`)),
      base()
        .avif({ quality: AVIF_QUALITY, effort: 3 })
        .toFile(path.join(dir, `${tier}.avif`)),
    );
    if (master.ext === "jpg" && tier !== 100) {
      jobs.push(
        base()
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toFile(path.join(dir, `${tier}.jpg.tmp`))
          .then(async () => {
            const { rename } = await import("node:fs/promises");
            await rename(
              path.join(dir, `${tier}.jpg.tmp`),
              path.join(dir, `${tier}.jpg`),
            );
          }),
      );
    }
  }
  await Promise.all(jobs);
  const parts = [];
  for (const tier of TIERS) {
    for (const ext of ["webp", "avif"]) {
      const f = path.join(dir, `${tier}.${ext}`);
      parts.push(`${tier}.${ext} ${kb((await stat(f)).size)}`);
    }
  }
  console.log(`${path.relative(projectsRoot, dir)}: ${parts.join(", ")}`);
};

const args = process.argv.slice(2);
const dirs =
  args[0] === "--all" ? await findImageDirs(projectsRoot) : args;
if (dirs.length === 0) {
  console.error("usage: encode-image.mjs <dir> [<dir> ...] | --all");
  process.exit(1);
}
for (const dir of dirs) {
  await encodeDir(dir);
}
