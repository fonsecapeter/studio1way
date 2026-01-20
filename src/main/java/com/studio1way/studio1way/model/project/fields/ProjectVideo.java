package com.studio1way.studio1way.model.project.fields;

import java.io.File;
import java.util.Objects;

public class ProjectVideo {

    public enum AspectRatio {
        WIDE("16-9"),
        FULL("4-3");

        private final String value;

        AspectRatio(String value) {
            this.value = value;
        }

        public String toString() {
            return value;
        }
    }

    private String src;
    private AspectRatio aspectRatio;

    public ProjectVideo() {}

    public ProjectVideo(String src, AspectRatio aspectRatio) {
        setSrc(src);
        setAspectRatio(aspectRatio);
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getAspectRatio() {
        return aspectRatio.toString();
    }

    public void setAspectRatio(String aspectRatio) {
        this.aspectRatio = AspectRatio.valueOf(aspectRatio);
    }

    public void setAspectRatio(AspectRatio aspectRatio) {
        this.aspectRatio = aspectRatio;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        ProjectVideo otherProjectVideo = (ProjectVideo) other;
        return (
            Objects.equals(getSrc(), otherProjectVideo.getSrc()) &&
            Objects.equals(getAspectRatio(), otherProjectVideo.getAspectRatio())
        );
    }
}
