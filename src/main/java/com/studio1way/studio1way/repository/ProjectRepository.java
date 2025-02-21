package com.studio1way.studio1way.repository;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.ProjectCategory;
import com.studio1way.studio1way.model.project.ProjectLink;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ProjectRepository extends InMemoryReadOnlyRepository<Project, String> {

    public ProjectRepository(List<Project> initialData) {
        super(initialData);
    }

    public ProjectRepository() {
        super(
            List.of(
                new Project(
                    "my-brain",
                    "My Brain",
                    new ProjectLink[] {
                        new ProjectLink(
                            "https://www.behance.net/gallery/41763273/My-Brain",
                            "behance"
                        ),
                    },
                    LocalDate.now(),
                    ProjectCategory.THREE_D_PRINTING,
                    "I used to run MRIs at UCSF."
                ),
                new Project(
                    "workbench",
                    "Workbench",
                    new ProjectLink[] {
                        new ProjectLink(
                            "https://www.behance.net/gallery/203419849/Workbench",
                            "behance"
                        ),
                    },
                    LocalDate.now(),
                    ProjectCategory.WOODWORKING,
                    "Always wanted one of these."
                )
            )
        );
    }
}
