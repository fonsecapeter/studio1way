package com.studio1way.studio1way.repository.project;

import com.studio1way.studio1way.model.project.OtherProject;
import com.studio1way.studio1way.repository.InMemoryReadOnlyRepository;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceLoader;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class OtherProjectRepository
    extends InMemoryReadOnlyRepository<OtherProject, String> {

    public OtherProjectRepository(Map<String, OtherProject> initialData) {
        super(initialData);
    }

    public OtherProjectRepository() {
        super(
            new ProjectResourceLoader<OtherProject>(
                OtherProject.class,
                "/app/src/main/resources/projects/other/"
            )
                .allProjects()
        );
    }
}
