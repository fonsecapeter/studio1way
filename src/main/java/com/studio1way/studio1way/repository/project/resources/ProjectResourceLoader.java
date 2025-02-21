package com.studio1way.studio1way.repository.project.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studio1way.studio1way.model.project.Project;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ProjectResourceLoader {

    public static List<Project> allProjects() {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Project> projects = new ArrayList<>();
        for (ProjectResource projectResource : ProjectResource.values()) {
            try {
                projects.add(
                    objectMapper.readValue(
                        new File(projectResource.toString()),
                        Project.class
                    )
                );
            } catch (IOException err) {
                throw new RuntimeException("Error loading project resource", err);
            }
        }
        return projects;
    }
}
