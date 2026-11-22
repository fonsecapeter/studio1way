package com.studio1way.studio1way.model.project.fields;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Objects;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

public class ProjectImage {

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
    private Integer width;
    private Integer height;
    private boolean dimensionsLoaded = false;

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
        return ProjectImagePaths.tierPath(path, ProjectImagePaths.FULL, ext.toString());
    }

    public String getHalf() {
        return ProjectImagePaths.tierPath(path, ProjectImagePaths.HALF, ext.toString());
    }

    public String getQuarter() {
        return ProjectImagePaths.tierPath(
            path,
            ProjectImagePaths.QUARTER,
            ext.toString()
        );
    }

    public Integer getWidth() {
        loadDimensions();
        return width;
    }

    public Integer getHeight() {
        loadDimensions();
        return height;
    }

    private void loadDimensions() {
        if (dimensionsLoaded) {
            return;
        }
        dimensionsLoaded = true;
        File file = ProjectImagePaths.tierFile(
            path,
            ProjectImagePaths.FULL,
            ext.toString()
        );
        if (!file.exists()) {
            return;
        }
        try (ImageInputStream in = ImageIO.createImageInputStream(file)) {
            Iterator<ImageReader> readers = ImageIO.getImageReaders(in);
            if (readers.hasNext()) {
                ImageReader reader = readers.next();
                reader.setInput(in);
                width = reader.getWidth(0);
                height = reader.getHeight(0);
                reader.dispose();
            }
        } catch (IOException e) {
            // Dimensions only feed layout hints; a missing size is fine.
        }
    }

    public Boolean valid() {
        if (hasAnimation() && !getAnimation().valid()) {
            return false;
        }
        return (
            ProjectImagePaths
                .tierFile(path, ProjectImagePaths.FULL, ext.toString())
                .exists() ||
            ProjectImagePaths
                .tierFile(path, ProjectImagePaths.HALF, ext.toString())
                .exists() ||
            ProjectImagePaths
                .tierFile(path, ProjectImagePaths.QUARTER, ext.toString())
                .exists()
        );
    }

    public ObjectNode toResourceJson() {
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        node.put("path", path);
        node.put("ext", ext.name());
        node.put("alt", alt);
        if (Boolean.TRUE.equals(neverOverlap)) {
            node.put("neverOverlap", true);
        }
        if (animation != null) {
            node.set("animation", animation.toResourceJson());
        }
        return node;
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
