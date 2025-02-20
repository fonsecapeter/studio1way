package com.studio1way.studio1way.controller;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @QueryMapping
    public List<Project> projects() {
        return projectService.findAll();
    }

    @QueryMapping
    public Optional<Project> projectById(@Argument String id) {
        return projectService.findById(id);
    }
}
