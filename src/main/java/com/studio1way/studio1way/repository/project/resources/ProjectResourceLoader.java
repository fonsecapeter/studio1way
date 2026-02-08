package com.studio1way.studio1way.repository.project.resources;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.studio1way.studio1way.model.project.Project;
import java.io.File;
import java.io.IOException;
import java.util.*;
import org.springframework.cache.annotation.Cacheable;

public class ProjectResourceLoader<T extends Project> {

    public ProjectResourceLoader() {}

    @Cacheable(value = "projects", key = "#resourceDir")
    public Map<String, T> allProjects(Class<T> resourceType, String resourceDir) {
        LinkedHashMap<String, T> projects = new LinkedHashMap<>();
        for (T project : loadProjects(resourceType, resourceDir)) {
            projects.put(project.getId(), project);
        }
        return projects;
    }

    private List<T> loadProjects(Class<T> resourceType, String resourceDir) {
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
                project = objectMapper.readValue(file, resourceType);
            } catch (IOException err) {
                throw new RuntimeException(
                    String.format(
                        "Error loading project resource: %s %s",
                        resourceType,
                        file.getAbsolutePath()
                    ),
                    err
                );
            }
            projects.add(project);
        }
        Collections.sort(projects, Collections.reverseOrder());
        return projects;
    }
}
