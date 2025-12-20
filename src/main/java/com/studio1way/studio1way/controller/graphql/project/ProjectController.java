package com.studio1way.studio1way.controller.graphql.project;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.service.ProjectService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

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
}
