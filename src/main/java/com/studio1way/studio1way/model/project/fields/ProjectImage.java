package com.studio1way.studio1way.model.project.fields;

import java.io.File;
import java.util.Objects;

public class ProjectImage {

    private final String IMG_PATH = "/img/projects";
    private final String ABS_PATH = "/app/frontend/src/assets/";

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
    private Boolean neverOverlap = false;
    private ProjectAnimation animation;

    public ProjectImage() {}

    public ProjectImage(
        String path,
        Extension ext,
        String alt,
        ProjectAnimation animation
    ) {
        setPath(path);
        setExt(ext);
        setAlt(alt);
        setAnimation(animation);
    }

    public ProjectImage(String path, Extension ext, String alt, Boolean neverOverlap) {
        setPath(path);
        setExt(ext);
        setAlt(alt);
        setNeverOverlap(neverOverlap);
    }

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

    public Boolean getNeverOverlap() {
        return neverOverlap;
    }

    public void setNeverOverlap(Boolean neverOverlap) {
        this.neverOverlap = neverOverlap;
    }

    public ProjectAnimation getAnimation() {
        return animation;
    }

    public void setAnimation(ProjectAnimation animation) {
        this.animation = animation;
    }

    private boolean hasAnimation() {
        return getAnimation() != null;
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

    public Boolean valid() {
        if (hasAnimation() && !getAnimation().valid()) {
            return false;
        }
        return (
            new File(String.format("%s/%s", ABS_PATH, getFull())).exists() ||
            new File(String.format("%s/%s", ABS_PATH, getHalf())).exists() ||
            new File(String.format("%s/%s", ABS_PATH, getQuarter())).exists()
        );
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        ProjectImage otherProjectImage = (ProjectImage) other;
        return (
            Objects.equals(getPath(), otherProjectImage.getPath()) &&
            Objects.equals(getExt(), otherProjectImage.getExt()) &&
            Objects.equals(getAlt(), otherProjectImage.getAlt()) &&
            Objects.equals(getNeverOverlap(), otherProjectImage.getNeverOverlap()) &&
            Objects.equals(getAnimation(), otherProjectImage.getAnimation())
        );
    }
}
