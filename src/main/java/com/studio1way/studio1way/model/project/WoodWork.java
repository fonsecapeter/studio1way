package com.studio1way.studio1way.model.project;

import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import java.util.Objects;

public class WoodWork extends Project {

    public enum Finish {
        PASTE_WAX("linseed oil + beesewax"),
        VARNISH("varnish"),
        ACRYLIC_PAINT_AND_PASTE_WAX("acrylic paint + linseed oil + beesewax");

        private final String value;

        Finish(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    private String materials;
    private Finish finish;
    private Float height; // inches
    private Float width; // inches
    private Float depth; // inches

    public WoodWork() {}

    public WoodWork(
        String id,
        String name,
        ProjectImage icon,
        ProjectLink[] links,
        String date,
        String description,
        ProjectImage[] images,
        String materials,
        Finish finish,
        Float height,
        Float width,
        Float depth
    ) {
        super(id, name, icon, links, date, description, images);
        setMaterials(materials);
        setFinish(finish);
        setHeight(height);
        setWidth(width);
        setDepth(depth);
    }

    public String getMaterials() {
        return materials;
    }

    public void setMaterials(String materials) {
        this.materials = materials;
    }

    public String getFinish() {
        return finish.toString();
    }

    public void setFinish(String finish) {
        this.finish = Finish.valueOf(finish);
    }

    public void setFinish(Finish finish) {
        this.finish = finish;
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
        WoodWork otherWoodWork = (WoodWork) other;
        return (
            super.equals(otherWoodWork) &&
            Objects.equals(getMaterials(), otherWoodWork.getMaterials()) &&
            Objects.equals(getFinish(), otherWoodWork.getFinish()) &&
            Objects.equals(getHeight(), otherWoodWork.getHeight()) &&
            Objects.equals(getWidth(), otherWoodWork.getWidth()) &&
            Objects.equals(getDepth(), otherWoodWork.getDepth())
        );
    }
}
