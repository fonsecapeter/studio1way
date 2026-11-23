package com.studio1way.projectadmin.create;

import java.io.IOException;
import java.nio.file.Path;

/**
 * Generates the 50%/25% tiers and WebP/AVIF encodings for one staged
 * image directory (the directory already holds the 100% original).
 * The production implementation runs the repo's own image scripts;
 * tests substitute a fake so CI needs no image tools.
 */
public interface DerivativeGenerator {
    void generate(Path imageDir) throws IOException;
}
