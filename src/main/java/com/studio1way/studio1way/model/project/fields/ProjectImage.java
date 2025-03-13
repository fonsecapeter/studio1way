package com.studio1way.studio1way.model.project.fields;

import java.util.Objects;

public class ProjectImage {

    private final String IMG_PATH = "/img/projects";

    public enum Extension {
        JPG("jpg"),
        PNG("png"),
        SVG("svg"),
        GIF("gif");

        private final String value;

        Extension(String value) {
            this.value = value;
        }

        public String toString() {
            return value;
        }
    }

    private String path;
    private Extension ext;
    private String alt;

    public ProjectImage() {}

    public ProjectImage(String path, Extension ext, String alt) {
        setPath(path);
        setExt(ext);
        setAlt(alt);
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getExt() {
        return ext.toString();
    }

    public void setExt(String ext) {
        this.ext = Extension.valueOf(ext);
    }

    public void setExt(Extension ext) {
        this.ext = ext;
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

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        ProjectImage otherProjectImage = (ProjectImage) other;
        return (
            Objects.equals(path, otherProjectImage.getPath()) &&
            Objects.equals(getExt(), otherProjectImage.getExt()) &&
            Objects.equals(alt, otherProjectImage.getAlt())
        );
    }
}
