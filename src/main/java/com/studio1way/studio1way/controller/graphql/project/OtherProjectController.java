package com.studio1way.studio1way.controller.graphql.project;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.service.ProjectService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class OtherProjectController {

    private final ProjectService projectService;

    @Autowired
    public OtherProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @QueryMapping
    public List<Project> otherProjects() {
        return projectService.findAll();
    }

    @QueryMapping
    public Project otherProject(@Argument String id) {
        return projectService.findById(id);
    }
}
