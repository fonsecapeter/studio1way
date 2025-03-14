package com.studio1way.studio1way.repository.project;

import com.studio1way.studio1way.model.project.CeramicWare;
import com.studio1way.studio1way.repository.InMemoryReadOnlyRepository;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceLoader;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class CeramicWareRepository
    extends InMemoryReadOnlyRepository<CeramicWare, String> {

    public CeramicWareRepository(Map<String, CeramicWare> initialData) {
        super(initialData);
    }

    public CeramicWareRepository() {
        super(
            new ProjectResourceLoader<CeramicWare>(
                CeramicWare.class,
                "/app/src/main/resources/projects/ceramicwares/"
            )
                .allProjects()
        );
    }
}
