package com.studio1way.studio1way.repository.project.resources;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.studio1way.studio1way.model.project.Project;
import java.io.File;
import java.io.IOException;
import java.util.*;

public class ProjectResourceLoader<T extends Project> {

    private final TypeReference<T> typeReference = new TypeReference<T>() {};
    private final String resourceDir;

    public ProjectResourceLoader(String resourceDir) {
        this.resourceDir = resourceDir;
    }

    public Map<String, T> allProjects() {
        LinkedHashMap<String, T> projects = new LinkedHashMap<>();
        for (T project : loadProjects()) {
            projects.put(project.getId(), project);
        }
        return projects;
    }

    private List<T> loadProjects() {
        List<T> projects = new ArrayList<T>();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
        File directory = new File(resourceDir);
        File[] files = directory.listFiles((dir, name) ->
            name.toLowerCase().endsWith(".json")
        );
        T project;
        for (File file : files) {
            try {
                project = objectMapper.readValue(file, typeReference);
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
