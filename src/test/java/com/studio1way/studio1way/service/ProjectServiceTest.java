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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

public class ProjectServiceTest {
    @InjectMocks
    private ProjectService projectService;
    @Mock
    private ProjectRepository projectRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        Project project = new Project(
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
        );
        when(projectRepository.findAll()).thenReturn(List.of(project));
        when(projectRepository.findById(anyString())).thenReturn(null);
        when(projectRepository.findById("test-project")).thenReturn(Optional.of(project));
    }

    @Test
    public void testFindAll() {
        List<Project> projects = projectService.findAll();
        assertEquals(projects.size(), 1);
        assertEquals(projects.get(0).getId(), "test-project");
    }

    @Test
    public void testFindByIdFound() {
        Optional<Project> project = projectService.findById("test-project");
        assertEquals(project.get().getId(), "test-project");
    }

    @Test
    public void testFindByIdNotFound() {
        Optional<Project> project = projectService.findById("something-bogus");
        assertNull(project);
    }
}
