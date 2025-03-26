package com.studio1way.studio1way.model.project.fields;

import java.util.Objects;

public class Project3Dimension extends Project2Dimension {

    // In inches

    private Float depth;

    public Project3Dimension() {}

    public Project3Dimension(Float height, Float width, Float depth) {
        super(height, width);
        setDepth(depth);
    }

    public Float getDepth() {
        return depth;
    }

    public void setDepth(Float depth) {
        this.depth = depth;
    }

    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        Project3Dimension otherDimension = (Project3Dimension) other;
        return (
            super.equals(otherDimension) &&
            Objects.equals(getDepth(), otherDimension.getDepth())
        );
    }
}
