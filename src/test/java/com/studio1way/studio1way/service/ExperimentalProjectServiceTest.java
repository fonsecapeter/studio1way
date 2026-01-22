package com.studio1way.studio1way.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import com.studio1way.studio1way.model.project.ExperimentalProject;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.repository.project.ExperimentalProjectRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class ExperimentalProjectServiceTest {

    @InjectMocks
    private ExperimentalProjectService otherProjectService;

    @Mock
    private ExperimentalProjectRepository otherProjectRepository;

    private ExperimentalProject project = new ExperimentalProject(
        "test-project",
        "Test Project",
        new ProjectImage(
            "experiments/my_brain/main",
            ProjectImage.Extension.JPG,
            "test icon"
        ),
        new ProjectLink[] { new ProjectLink("https://something.com", "examples") },
        "2025",
        "A test project.",
        new ProjectImage[] {
            new ProjectImage(
                "experiments/my_brain/main",
                ProjectImage.Extension.JPG,
                "test image"
            ),
        },
        "digital"
    );

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        when(otherProjectRepository.findAll()).thenReturn(List.of(project));
        when(otherProjectRepository.findById(anyString())).thenReturn(null);
        when(otherProjectRepository.findById("test-project")).thenReturn(project);
    }

    @Test
    public void testFindAll() {
        List<ExperimentalProject> projects = otherProjectService.findAll();
        assertEquals(1, projects.size());
        assertTrue(projects.get(0).equals(project));
    }

    @Test
    public void testFindByIdFound() {
        ExperimentalProject loadedProject = otherProjectService.findById("test-project");
        assertTrue(loadedProject.equals(project));
    }

    @Test
    public void testFindByIdNotFound() {
        ExperimentalProject loadedProject = otherProjectService.findById(
            "something-bogus"
        );
        assertNull(loadedProject);
    }
}
