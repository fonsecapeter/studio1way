package com.studio1way.studio1way.model.project.fields;

import java.io.File;
import java.util.Objects;

public class ProjectAnimation {

    private final String IMG_PATH = "/img/projects";
    private final String ABS_PATH = "/app/frontend/src/assets/";
    private final String EXTENSION = "gif";

    private String path;
    private String alt;

    public ProjectAnimation() {}

    public ProjectAnimation(String path, String alt) {
        setPath(path);
        setAlt(alt);
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public String getFull() {
        return String.format("%s/%s/100.%s", IMG_PATH, path, EXTENSION);
    }

    public String getHalf() {
        return String.format("%s/%s/50.%s", IMG_PATH, path, EXTENSION);
    }

    public Boolean valid() {
        return (
            new File(String.format("%s/%s", ABS_PATH, getFull())).exists() &&
            new File(String.format("%s/%s", ABS_PATH, getHalf())).exists()
        );
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        ProjectAnimation otherProjectAnimation = (ProjectAnimation) other;
        return (
            Objects.equals(getPath(), otherProjectAnimation.getPath()) &&
            Objects.equals(getAlt(), otherProjectAnimation.getAlt())
        );
    }
}
