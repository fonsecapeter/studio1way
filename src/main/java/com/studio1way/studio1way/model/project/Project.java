package com.studio1way.studio1way.model.project;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;

public class Project {

    private String id;
    private String name;
    private ProjectLink[] links;
    private String date;
    private ProjectCategory category;
    private String description;

    public Project() {}

    public Project(
        String id,
        String name,
        ProjectLink[] links,
        String date,
        ProjectCategory category,
        String description
    ) {
        this.id = id;
        this.name = name;
        this.links = links;
        this.date = date;
        this.category = category;
        this.description = description;
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

    public ProjectLink[] getLinks() {
        return this.links;
    }

    public void setLinks() {
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
        this.category = ProjectCategory.valueOf(category);
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
