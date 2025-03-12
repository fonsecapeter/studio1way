package com.studio1way.studio1way.model.project;

import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import java.util.Arrays;
import java.util.Objects;

public class Project {

    public enum Category {
        PAINT("paint"),
        WOOD("wood"),
        CERAMICS("ceramics"),
        OTHER("other");

        private final String value;

        private Category(String value) {
            this.value = value;
        }

        public String toString() {
            return value;
        }
    }

    private String id;
    private String name;
    private ProjectImage icon;
    private ProjectLink[] links;
    private String date;
    private Category category;
    private String description;
    private String[] materials;
    private ProjectImage[] images;

    public Project() {}

    public Project(
        String id,
        String name,
        ProjectImage icon,
        ProjectLink[] links,
        String date,
        Category category,
        String description,
        String[] materials,
        ProjectImage[] images
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.links = links;
        this.date = date;
        this.category = category;
        this.description = description;
        this.materials = materials;
        this.images = images;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProjectImage getIcon() {
        return this.icon;
    }

    public void setIcon(ProjectImage icon) {
        this.icon = icon;
    }

    public ProjectLink[] getLinks() {
        return this.links;
    }

    public void setLinks(ProjectLink[] links) {
        this.links = links;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCategory() {
        return this.category.toString();
    }

    public void setCategory(String category) {
        this.category = Category.valueOf(category);
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[] getMaterials() {
        return this.materials;
    }

    public void setMaterials(String[] materials) {
        this.materials = materials;
    }

    public ProjectImage[] getImages() {
        return images;
    }

    public void setImages(ProjectImage[] images) {
        this.images = images;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        Project otherProject = (Project) other;
        return (
            Objects.equals(id, otherProject.getId()) &&
            Objects.equals(name, otherProject.getName()) &&
            Objects.equals(icon, otherProject.getIcon()) &&
            Arrays.equals(links, otherProject.getLinks()) &&
            Objects.equals(date, otherProject.getDate()) &&
            Objects.equals(this.getCategory(), otherProject.getCategory()) &&
            Objects.equals(description, otherProject.getDescription()) &&
            Arrays.equals(materials, otherProject.getMaterials()) &&
            Arrays.equals(images, otherProject.getImages())
        );
    }
}
