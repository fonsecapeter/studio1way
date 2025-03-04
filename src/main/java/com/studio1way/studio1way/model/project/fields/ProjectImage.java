package com.studio1way.studio1way.model.project.fields;

public class ProjectImage {

    public enum Extension {
        JPG("jpg"),
        PNG("png"),
        SVG("svg"),
        GIF("png");

        private final String value;

        private Extension(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    private String path;
    private Extension ext;
    private String alt;

    private final String IMG_PATH = "/img/projects";

    public ProjectImage() {}

    public ProjectImage(String path, Extension ext, String alt) {
        this.path = path;
        this.ext = ext;
        this.alt = alt;
    }

    public String getPath() {
        return this.path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getExt() {
        return this.ext.toString();
    }

    public void setExtension(String ext) {
        this.ext = Extension.valueOf(ext);
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public String getFull() {
        return String.format("%s/%s/100.%s", IMG_PATH, path, ext.toString());
    }

    public String getHalf() {
        return String.format("%s/%s/50.%s", IMG_PATH, path, ext.toString());
    }

    public String getQuarter() {
        return String.format("%s/%s/25.%s", IMG_PATH, path, ext.toString());
    }
}
