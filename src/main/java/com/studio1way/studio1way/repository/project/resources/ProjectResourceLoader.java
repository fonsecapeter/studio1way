package com.studio1way.studio1way.repository.project.resources;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.studio1way.studio1way.model.project.Project;
import java.io.File;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public class ProjectResourceLoader {

    public static Map<String, Project> allProjects() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
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
                throw new RuntimeException(
                    String.format("Error loading project resource: %s", projectResource),
                    err
                );
            }
            projects.put(project.getId(), project);
        }
        return projects;
    }
}
