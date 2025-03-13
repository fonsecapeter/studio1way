package com.studio1way.studio1way.repository.project.resources;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.studio1way.studio1way.model.project.Project;
import java.io.File;
import java.io.IOException;
import java.util.*;

public class ProjectResourceLoader {

    private static String ResourceDir = "/app/src/main/resources/projects/";

    public static Map<String, Project> allProjects() {
        LinkedHashMap<String, Project> projects = new LinkedHashMap<>();
        for (Project project : loadProjects()) {
            projects.put(project.getId(), project);
        }
        return projects;
    }

    private static List<Project> loadProjects() {
        List<Project> projects = new ArrayList<Project>();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
        File directory = new File(ResourceDir);
        File[] files = directory.listFiles((dir, name) ->
            name.toLowerCase().endsWith(".json")
        );
        Project project;
        for (File file : files) {
            try {
                project = objectMapper.readValue(file, Project.class);
            } catch (IOException err) {
                throw new RuntimeException(
                    String.format(
                        "Error loading project resource: %s",
                        file.getAbsolutePath()
                    ),
                    err
                );
            }
            projects.add(project);
        }
        Collections.sort(projects);
        return projects;
    }
}
