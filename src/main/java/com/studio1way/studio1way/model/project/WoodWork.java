package com.studio1way.studio1way.model.project;

import com.studio1way.studio1way.model.project.fields.Project3Dimension;
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
    private Project3Dimension dimensions;

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
        Project3Dimension dimensions
    ) {
        super(id, name, icon, links, date, description, images);
        setMaterials(materials);
        setFinish(finish);
        setDimensions(dimensions);
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

    public Project3Dimension getDimensions() {
        return dimensions;
    }

    public void setDimensions(Project3Dimension dimensions) {
        this.dimensions = dimensions;
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
            Objects.equals(getDimensions(), otherWoodWork.getDimensions())
        );
    }
}
