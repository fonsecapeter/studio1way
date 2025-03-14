package com.studio1way.studio1way.repository.project;

import com.studio1way.studio1way.model.project.WoodWork;
import com.studio1way.studio1way.repository.InMemoryReadOnlyRepository;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceLoader;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class WoodWorkRepository extends InMemoryReadOnlyRepository<WoodWork, String> {

    public WoodWorkRepository(Map<String, WoodWork> initialData) {
        super(initialData);
    }

    public WoodWorkRepository() {
        super(
            new ProjectResourceLoader<WoodWork>(
                WoodWork.class,
                "/app/src/main/resources/projects/woodworks/"
            )
                .allProjects()
        );
    }
}
