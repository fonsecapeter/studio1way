package com.studio1way.studio1way.service;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.ProjectCategory;
import com.studio1way.studio1way.model.project.ProjectLink;
import com.studio1way.studio1way.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class ProjectServiceTest {
    @InjectMocks
    private ProjectService projectService;
    @Mock
    private ProjectRepository projectRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAllProjects () {
        when(projectRepository.findAll()).thenReturn(
            List.of(
                new Project(
                    "test-project",
                    "Test Project",
                    new ProjectLink[] {
                        new ProjectLink(
                             "https://something.com",
                             "examples"
                        )
                    },
                    LocalDate.now(),
                    ProjectCategory.PAINTING,
                    "A test project."
                )
            )
        );

        List<Project> projects = projectService.allProjects();
        assertEquals(projects.size(), 1);
        assertEquals(projects.get(0).getId(), "test-project");
    }

}
