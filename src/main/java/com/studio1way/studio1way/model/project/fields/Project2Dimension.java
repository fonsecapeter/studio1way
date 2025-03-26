package com.studio1way.studio1way.model.project.fields;

import java.util.Objects;

public class Project2Dimension {

    // In inches

    private Float height;
    private Float width;

    public Project2Dimension() {}

    public Project2Dimension(Float height, Float width) {
        setHeight(height);
        setWidth(width);
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

    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        Project2Dimension otherDimension = (Project2Dimension) other;
        return (
            Objects.equals(getHeight(), otherDimension.getHeight()) &&
            Objects.equals(getWidth(), otherDimension.getWidth())
        );
    }
}
