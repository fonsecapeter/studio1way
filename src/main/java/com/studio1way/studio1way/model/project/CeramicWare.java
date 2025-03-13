package com.studio1way.studio1way.model.project;

import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import java.util.Objects;

public class CeramicWare extends Project {

    public enum ClayBody {
        CROCKD("crockd"),
        GRAY_STONEWARE("gray stoneware"),
        WHITE_STONEWARE("white stoneware");

        private final String value;

        ClayBody(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    private ClayBody clayBody;
    private String glaze;
    private Float height; // inches
    private Float width; // inches
    private Float depth; // inches

    public CeramicWare() {}

    public CeramicWare(
        String id,
        String name,
        ProjectImage icon,
        ProjectLink[] links,
        String date,
        String description,
        ProjectImage[] images,
        ClayBody clayBody,
        String glaze,
        Float height,
        Float width,
        Float depth
    ) {
        super(id, name, icon, links, date, description, images);
        setClayBody(clayBody);
        setGlaze(glaze);
        setHeight(height);
        setWidth(width);
        setDepth(depth);
    }

    public String getClayBody() {
        return clayBody.toString();
    }

    public void setClayBody(String clayBody) {
        this.clayBody = ClayBody.valueOf(clayBody);
    }

    public void setClayBody(ClayBody clayBody) {
        this.clayBody = clayBody;
    }

    public String getGlaze() {
        return glaze;
    }

    public void setGlaze(String glaze) {
        this.glaze = glaze;
    }

    public Float getHeight() {
        return height;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public Float getWidth() {
        return width;
    }

    public void setWidth(Float width) {
        this.width = width;
    }

    public Float getDepth() {
        return depth;
    }

    public void setDepth(Float depth) {
        this.depth = depth;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        CeramicWare otherCeramicWare = (CeramicWare) other;
        return (
            super.equals(otherCeramicWare) &&
            Objects.equals(getGlaze(), otherCeramicWare.getGlaze()) &&
            Objects.equals(getClayBody(), otherCeramicWare.getClayBody()) &&
            Objects.equals(getHeight(), otherCeramicWare.getHeight()) &&
            Objects.equals(getWidth(), otherCeramicWare.getWidth()) &
            Objects.equals(getDepth(), otherCeramicWare.getDepth())
        );
    }
}
