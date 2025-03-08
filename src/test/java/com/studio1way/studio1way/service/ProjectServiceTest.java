package com.studio1way.studio1way.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.repository.project.ProjectRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

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
            new ProjectImage("some/path", ProjectImage.Extension.PNG, "test icon"),
            new ProjectLink[] { new ProjectLink("https://something.com", "examples") },
            "2025",
            Project.Category.PAINTING,
            "A test project.",
            new String[] { "void" },
            new ProjectImage[] {
                new ProjectImage("some/path", ProjectImage.Extension.PNG, "test image"),
            }
        );
        when(projectRepository.findAll()).thenReturn(List.of(project));
        when(projectRepository.findById(anyString())).thenReturn(null);
        when(projectRepository.findById("test-project")).thenReturn(project);
    }

    @Test
    public void testFindAll() {
        List<Project> projects = projectService.findAll();
        assertEquals(projects.size(), 1);
        assertEquals(projects.get(0).getId(), "test-project");
    }

    @Test
    public void testFindByIdFound() {
        Project project = projectService.findById("test-project");
        assertEquals(project.getId(), "test-project");
    }

    @Test
    public void testFindByIdNotFound() {
        Project project = projectService.findById("something-bogus");
        assertNull(project);
    }
}
