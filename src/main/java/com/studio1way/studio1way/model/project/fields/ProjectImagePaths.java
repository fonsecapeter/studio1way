package com.studio1way.studio1way.model.project.fields;

import com.studio1way.studio1way.AppRoot;
import java.io.File;

public final class ProjectImagePaths {

    public static final String FULL = "100";
    public static final String HALF = "50";
    public static final String QUARTER = "25";

    private static final String IMG_PATH = "/img/projects";
    private static final String ABS_PATH = AppRoot.PATH + "/frontend/src/assets/";

    private ProjectImagePaths() {}

    public static String tierPath(String path, String tier, String ext) {
        return String.format("%s/%s/%s.%s", IMG_PATH, path, tier, ext);
    }

    public static File tierFile(String path, String tier, String ext) {
        return new File(String.format("%s/%s", ABS_PATH, tierPath(path, tier, ext)));
    }
}
