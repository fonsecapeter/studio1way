package com.studio1way.studio1way.repository.project;

import com.studio1way.studio1way.model.project.ExperimentalProject;
import com.studio1way.studio1way.repository.InMemoryReadOnlyRepository;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceLoader;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class ExperimentalProjectRepository
    extends InMemoryReadOnlyRepository<ExperimentalProject, String> {

    public ExperimentalProjectRepository(Map<String, ExperimentalProject> initialData) {
        super(initialData);
    }

    public ExperimentalProjectRepository() {
        super(
            new ProjectResourceLoader<ExperimentalProject>(
                ExperimentalProject.class,
                "/app/src/main/resources/projects/experiments/"
            )
                .allProjects()
        );
    }
}
