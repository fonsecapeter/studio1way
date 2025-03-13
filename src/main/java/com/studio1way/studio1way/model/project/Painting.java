package com.studio1way.studio1way.model.project;

import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import java.util.Objects;

public class Painting extends Project {

    public enum Medium {
        OIL("oil"),
        ACRYLIC("acrylic"),
        PASTEL("pastel"),
        OIL_PASTEL("oil pastel"),
        WATERCOLOR("watercolor"),
        SHARPIE("sharpie");

        private final String value;

        Medium(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    private String surface;
    private Medium medium;
    private Boolean varnished;
    private Float height; // inches
    private Float width; // inches

    public Painting() {}

    public Painting(
        String id,
        String name,
        ProjectImage icon,
        ProjectLink[] links,
        String date,
        String description,
        ProjectImage[] images,
        String surface,
        Medium medium,
        Boolean varnished,
        Float height,
        Float width
    ) {
        super(id, name, icon, links, date, description, images);
        setSurface(surface);
        setMedium(medium);
        setVarnished(varnished);
        setHeight(height);
        setWidth(width);
    }

    public String getSurface() {
        return surface;
    }

    public void setSurface(String surface) {
        this.surface = surface;
    }

    public String getMedium() {
        return medium.toString();
    }

    public void setMedium(String medium) {
        this.medium = Medium.valueOf(medium);
    }

    public void setMedium(Medium medium) {
        this.medium = medium;
    }

    public Boolean getVarnished() {
        return varnished;
    }

    public void setVarnished(Boolean varnished) {
        this.varnished = varnished;
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

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        Painting otherPainting = (Painting) other;
        return (
            super.equals(otherPainting) &&
            Objects.equals(getSurface(), otherPainting.getSurface()) &&
            Objects.equals(getMedium(), otherPainting.getMedium()) &&
            Objects.equals(getVarnished(), otherPainting.getVarnished()) &&
            Objects.equals(getHeight(), otherPainting.getHeight()) &&
            Objects.equals(getWidth(), otherPainting.getWidth())
        );
    }
}
