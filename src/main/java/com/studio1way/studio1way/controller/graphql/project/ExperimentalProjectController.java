package com.studio1way.studio1way.controller.graphql.project;

import com.studio1way.studio1way.model.project.ExperimentalProject;
import com.studio1way.studio1way.service.ExperimentalProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ExperimentalProjectController {

    private final ExperimentalProjectService projectService;

    @Autowired
    public ExperimentalProjectController(ExperimentalProjectService projectService) {
        this.projectService = projectService;
    }

    @QueryMapping
    public ExperimentalProject experimentalProject(@Argument String id) {
        return projectService.findById(id);
    }
}
