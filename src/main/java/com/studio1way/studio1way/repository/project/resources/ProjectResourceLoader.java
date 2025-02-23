package com.studio1way.studio1way.repository.project.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studio1way.studio1way.model.project.Project;
import java.io.File;
import java.io.IOException;
import java.util.LinkedHashMap;

public class ProjectResourceLoader {

    public static LinkedHashMap<String, Project> allProjects() {
        ObjectMapper objectMapper = new ObjectMapper();
        LinkedHashMap<String, Project> projects = new LinkedHashMap<>();
        Project project;
        for (ProjectResource projectResource : ProjectResource.values()) {
            try {
                project =
                    objectMapper.readValue(
                        new File(projectResource.toString()),
                        Project.class
                    );
            } catch (IOException err) {
                throw new RuntimeException("Error loading project resource", err);
            }
            projects.put(project.getId(), project);
        }
        return projects;
    }
}
