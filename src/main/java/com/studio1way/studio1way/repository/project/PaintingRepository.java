package com.studio1way.studio1way.repository.project;

import com.studio1way.studio1way.model.project.Painting;
import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.repository.InMemoryReadOnlyRepository;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceLoader;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class PaintingRepository extends InMemoryReadOnlyRepository<Painting, String> {

    public PaintingRepository(Map<String, Painting> initialData) {
        super(initialData);
    }

    public PaintingRepository() {
        super(
            new ProjectResourceLoader<Painting>(
                Painting.class,
                "/app/src/main/resources/projects/paintings/"
            )
                .allProjects()
        );
    }
}
