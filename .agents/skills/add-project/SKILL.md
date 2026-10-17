---
name: add-project
description: Add a new art project to the Studio 1Way portfolio website. Covers the project JSON format for the four departments (ceramicwares, paintings, woodworks, experiments), the 100/50/25 image set produced with bin/resize-img, field rules, and validation. Use when adding a piece to the portfolio, publishing a new project on the site, or creating files under src/main/resources/projects/.
---

# Add a project to the Studio 1Way portfolio

The app loads project JSON files from `src/main/resources/projects/<category>/`
at startup, so adding a project is data only: one JSON file plus one image
set. No Java, no frontend changes, no registration step. Commit history shows
the pattern as single-purpose "Add <project>" commits.

## The shape of a project

- **Category** (directory = department): `ceramicwares`, `paintings`,
  `woodworks`, `experiments`.
- **JSON**: `src/main/resources/projects/<category>/<snake_case>.json`;
  the `id` inside is kebab-case (`safety-espresso-cup` pairs with
  `safety_espresso_cup.json`).
- **Images**: `frontend/src/assets/img/projects/<category>/<snake_case>/<image_name>/`
  holding `100.<ext>`, `50.<ext>`, `25.<ext>`. The source photo is the 100;
  `bin/resize-img <dir>` generates the other two (needs ImageMagick's
  `magick` and `tree` on PATH).
- **Common fields**: `id`, `name`, `icon` (one of the images, or a
  standalone image for video projects), `links` (`[{url, text}]`, usually
  `[]`), `date` (`yyyy`, `yyyy-mm`, or `yyyy-mm-dd`; when the piece was
  made), `description`, `images` (each `{path, ext, alt}`).
- **Per category** (the authoritative values live in the model classes
  under `src/main/java/com/studio1way/studio1way/model/project/`; the
  scripts parse the enums from there):
  - ceramicwares: `clayBody` (enum), `glaze` (free text), `dimensions`
    `{height, width, depth}`.
  - paintings: `surface` (free text), `medium` (enum), `varnished`
    (bool), `dimensions` `{height, width}`; dimensions is optional for
    paintings and often omitted.
  - woodworks: `materials` (free text), `finish` (enum), `dimensions`
    `{height, width, depth}`.
  - experiments: `variety` (free text, required), optional `video`
    `{src (YouTube embed URL), aspectRatio (WIDE | FULL)}`.
- **Rare extras**: an image can carry an `animation` `{path, alt}` — a gif
  in `<project>/animation/` at **100 + 50 only** (the two sizes
  `ProjectAnimation` serves) — or `neverOverlap: true`.

## Field rules

- **Description is written by the artist.** Never generate, draft, or
  polish one. If it has not been provided, ask and wait.
- **Confirm the optional fields** with whoever requested the project
  instead of silently defaulting them: date, links, dimensions, and the
  category fields (clay body and glaze; surface, medium, and varnished;
  materials and finish; variety and video).
- **Dimensions are usually 0.0** (only a couple of projects carry real
  measurements). Include the block with zeros for ceramicwares and
  woodworks; omit it for paintings unless real numbers are provided.
- **Alt text** is plain and concrete: what is pictured, in one clause.
  Draft it from the photos and have it reviewed.
- **Image directory names** are short content words (`main`, `solo`,
  `side`, `process`, `stamp`). The icon is the `main` image unless told
  otherwise.
- **A value that doesn't exist yet** (a new finish, medium, clay body):
  adds are otherwise data-only, but this is the one sanctioned code
  change. Add the value to the enum in the model class
  (`UPPER_SNAKE("display string")`, e.g. `TUNG_OIL("tung oil")` in
  `WoodWork.Finish`) and let it ride in the same commit. The scripts
  parse the enums from the Java sources at runtime, so the checker
  accepts the new value immediately, and the frontend renders the
  API's display string — no frontend or codegen changes. Call the
  exception out in the PR description.

## Workflow

1. Collect the inputs: category, title, the artist's description, the
   category fields, the date, any links, the photos, and a name + alt
   text for each photo.
2. Build a spec JSON and run the scaffolder:
   `scripts/scaffold-project <spec.json>` (paths relative to this skill
   folder). Spec keys: `category`, `name`, optional `id` (overrides
   the id derived from the name — possessives derive wrong, e.g.
   "Simi's Food Stand" → simi-s-food-stand vs simis-food-stand),
   `date`, `description`,
   `links`, `fields` (the category fields), `video`, `images`
   (`{name, src, alt, icon?, animation? {src, alt}, neverOverlap?}`),
   plus an optional standalone `icon` (same shape as an image) for
   video projects whose icon is not in `images`. The scaffolder copies
   each photo in as `100.<ext>`, runs `bin/resize-img`, writes the JSON,
   and refuses to overwrite an existing project.
3. Validate: `scripts/check-project <category> <id>` checks the JSON
   against the model rules and every referenced file. Then run the
   backend tests (`bin/test`, or `bin/native/test` where Docker is
   unavailable): the resource loader loads every project at startup, so
   green tests mean the JSON parses and every image validates.
4. Commit as one single-purpose commit: `Add <name lowercase>`.
5. Open a PR. CI captures preview screenshots of the new project's
   detail page and its category list and posts them to the PR as a
   comment (the screenshots job in `.circleci/config.yml`).
