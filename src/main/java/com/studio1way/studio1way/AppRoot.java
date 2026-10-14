package com.studio1way.studio1way;

/**
 * Filesystem root the app reads project data and frontend assets from.
 * Defaults to "/app" (the Docker layout, where the repo is mounted at
 * /app). Set the APP_ROOT environment variable to run natively from a
 * plain checkout (see bin/native).
 */
public final class AppRoot {

    public static final String PATH = System.getenv().getOrDefault("APP_ROOT", "/app");

    private AppRoot() {}
}
