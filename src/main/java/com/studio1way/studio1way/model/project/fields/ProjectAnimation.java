package com.studio1way.studio1way.model.project.fields;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.Objects;

public class ProjectAnimation {

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
        return ProjectImagePaths.tierPath(path, ProjectImagePaths.FULL, EXTENSION);
    }

    public String getHalf() {
        return ProjectImagePaths.tierPath(path, ProjectImagePaths.HALF, EXTENSION);
    }

    public Boolean valid() {
        return (
            ProjectImagePaths
                .tierFile(path, ProjectImagePaths.FULL, EXTENSION)
                .exists() &&
            ProjectImagePaths.tierFile(path, ProjectImagePaths.HALF, EXTENSION).exists()
        );
    }

    public ObjectNode toResourceJson() {
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        node.put("path", path);
        node.put("alt", alt);
        return node;
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
