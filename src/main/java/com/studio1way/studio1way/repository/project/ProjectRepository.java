package com.studio1way.studio1way.repository.project;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.repository.InMemoryReadOnlyRepository;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceLoader;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class ProjectRepository extends InMemoryReadOnlyRepository<Project, String> {

    public ProjectRepository(Map<String, Project> initialData) {
        super(initialData);
    }

    public ProjectRepository() {
        super(
            new ProjectResourceLoader<Project>("/app/src/main/resources/projects/other/")
                .allProjects()
        );
    }
}
