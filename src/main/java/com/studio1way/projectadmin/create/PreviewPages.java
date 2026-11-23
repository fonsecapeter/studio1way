package com.studio1way.projectadmin.create;

import com.studio1way.studio1way.AppRoot;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

/**
 * Owns preview-pages.txt for a create run: the file is set to exactly
 * the routes the new project needs (the comment header is kept), and
 * the previous content can be restored on rollback.
 */
public final class PreviewPages {

    private PreviewPages() {}

    public static Path file() {
        return Path.of(AppRoot.PATH, "preview-pages.txt");
    }

    /** Current content, or null when the file does not exist. */
    public static String read() throws IOException {
        return Files.exists(file())
            ? Files.readString(file(), StandardCharsets.UTF_8)
            : null;
    }

    public static void setRoutes(List<String> routes) throws IOException {
        StringBuilder content = new StringBuilder();
        String existing = read();
        if (existing != null) {
            for (String line : existing.split("\n")) {
                if (line.startsWith("#")) {
                    content.append(line).append("\n");
                }
            }
        }
        for (String route : routes) {
            content.append(route).append("\n");
        }
        Files.writeString(file(), content.toString(), StandardCharsets.UTF_8);
    }

    public static void restore(String original) throws IOException {
        if (original == null) {
            Files.deleteIfExists(file());
        } else {
            Files.writeString(file(), original, StandardCharsets.UTF_8);
        }
    }
}
