package com.studio1way.studio1way.model.project;

import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Objects;
import java.util.regex.Pattern;

public class Project implements Comparable<Project> {

    private String id;
    private String name;
    private ProjectImage icon;
    private ProjectLink[] links;

    private String date;

    private String description;
    private ProjectImage[] images;

    public Project() {}

    public Project(
        String id,
        String name,
        ProjectImage icon,
        ProjectLink[] links,
        String date,
        String description,
        ProjectImage[] images
    ) {
        setId(id);
        setName(name);
        setIcon(icon);
        setLinks(links);
        setDate(date);
        setDescription(description);
        setImages(images);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProjectImage getIcon() {
        return icon;
    }

    public void setIcon(ProjectImage icon) {
        this.icon = icon;
    }

    public ProjectLink[] getLinks() {
        return links;
    }

    public void setLinks(ProjectLink[] links) {
        this.links = links;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        if (!Pattern.matches("\\d{4}(-\\d{2}(-\\d{2})?)?", date)) {
            throw new IllegalArgumentException(
                String.format("Date %s must match yyyy[-mm[-dd]] format", date)
            );
        }
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProjectImage[] getImages() {
        return images;
    }

    public void setImages(ProjectImage[] images) {
        this.images = images;
    }

    @Override
    public int compareTo(Project other) {
        // Newest first
        return other.date.compareTo(date);
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        Project otherProject = (Project) other;
        return (
            Objects.equals(getId(), otherProject.getId()) &&
            Objects.equals(getName(), otherProject.getName()) &&
            Objects.equals(getIcon(), otherProject.getIcon()) &&
            Arrays.equals(getLinks(), otherProject.getLinks()) &&
            Objects.equals(getDate(), otherProject.getDate()) &&
            Objects.equals(getDescription(), otherProject.getDescription()) &&
            Arrays.equals(getImages(), otherProject.getImages())
        );
    }
}
