package com.studio1way.studio1way.repository.project;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.repository.InMemoryReadOnlyRepository;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceLoader;
import java.util.LinkedHashMap;
import org.springframework.stereotype.Repository;

@Repository
public class ProjectRepository extends InMemoryReadOnlyRepository<Project, String> {

    public ProjectRepository(LinkedHashMap<String, Project> initialData) {
        super(initialData);
    }

    public ProjectRepository() {
        super(ProjectResourceLoader.allProjects());
    }
}
