package com.studio1way.studio1way.model.project.resources;

import static org.junit.jupiter.api.Assertions.*;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceLoader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ProjectResourceLoaderTest {

    private Map<String, Project> projects;
    private final Project testProject = new Project(
        "test-project",
        "Test Project",
        new ProjectImage("some/path", ProjectImage.Extension.PNG, "test icon"),
        new ProjectLink[] { new ProjectLink("https://something.com", "example") },
        "2025",
        "A test project.",
        new ProjectImage[] {
            new ProjectImage("some/path", ProjectImage.Extension.PNG, "test image"),
        }
    );
    private final Project anotherTestProject = new Project(
        "another-test-project",
        "Another Test Project",
        new ProjectImage(
            "some/other/path",
            ProjectImage.Extension.PNG,
            "another test icon"
        ),
        new ProjectLink[] {
            new ProjectLink("https://somethingelse.com", "another example"),
        },
        "2024",
        "A similar, but different test project.",
        new ProjectImage[] {
            new ProjectImage(
                "some/other/path",
                ProjectImage.Extension.PNG,
                "another test image"
            ),
        }
    );

    @BeforeEach
    public void setUp() {
        projects =
            new ProjectResourceLoader<Project>(
                Project.class,
                "/app/src/test/resources/projects/"
            )
                .allProjects();
    }

    @Test
    public void testLoadsProjectsFromJsonFiles() {
        assertEquals(2, projects.size());
        Project loadedTestProject = projects.get("test-project");
        assertNotNull(loadedTestProject);
        assertTrue(loadedTestProject.equals(testProject));
        Project anotherLoadedTestProject = projects.get("another-test-project");
        assertNotNull(anotherLoadedTestProject);
        assertTrue(anotherLoadedTestProject.equals(anotherTestProject));
    }

    @Test
    public void testSortsProjectsByDate() {
        List<Project> projectValues = new ArrayList(projects.values());
        assertEquals(
            "another-test-project",
            projectValues.get(projects.size() - 1).getId()
        );
        assertEquals("test-project", projectValues.get(projects.size() - 2).getId());
    }
}
