package com.studio1way.studio1way.model.project;

import java.time.LocalDate;

public class Project {
    private final String id;
    private final String name;
    private final ProjectLink[] links;
    private final LocalDate date;
    private final ProjectCategory category;
    private final String description;

    public Project(
            String id,
            String name,
            ProjectLink[] links,
            LocalDate date,
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

    public String getName() {
        return this.name;
    }

    public ProjectLink[] getLinks() {
        return this.links;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public String getCategory() {
        return this.category.toString();
    }

    public String getDescription () {
        return this.description;
    }
}
