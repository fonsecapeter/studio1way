package com.studio1way.studio1way.model.project.resources;

import static org.junit.jupiter.api.Assertions.*;

import com.studio1way.studio1way.model.project.OtherProject;
import com.studio1way.studio1way.model.project.fields.ProjectAnimation;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceLoader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ProjectResourceLoaderTest {

    private Map<String, OtherProject> projects;
    private final OtherProject testProject = new OtherProject(
        "test-project",
        "Test Project",
        new ProjectImage(
            "paintings/v47_workshop/main",
            ProjectImage.Extension.JPG,
            "test icon"
        ),
        new ProjectLink[] { new ProjectLink("https://something.com", "example") },
        "2025",
        "A test project.",
        new ProjectImage[] {
            new ProjectImage(
                "paintings/v47_workshop/main",
                ProjectImage.Extension.JPG,
                "test image"
            ),
        },
        "digital"
    );
    private final OtherProject anotherTestProject = new OtherProject(
        "another-test-project",
        "Another Test Project",
        new ProjectImage(
            "paintings/v47_workshop/main",
            ProjectImage.Extension.JPG,
            "another test icon"
        ),
        new ProjectLink[] {
            new ProjectLink("https://somethingelse.com", "another example"),
        },
        "2024",
        "A similar, but different test project.",
        new ProjectImage[] {
            new ProjectImage(
                "paintings/v47_workshop/main",
                ProjectImage.Extension.JPG,
                "another test image",
                new ProjectAnimation(
                    "woodworks/shop_class_shelf/main/animation",
                    "a test animation"
                )
            ),
        },
        "digital"
    );

    @BeforeEach
    public void setUp() {
        projects =
            new ProjectResourceLoader<OtherProject>(
                OtherProject.class,
                "/app/src/test/resources/projects/"
            )
                .allProjects();
    }

    @Test
    public void testLoadsProjectsFromJsonFiles() {
        assertEquals(2, projects.size());
        OtherProject loadedTestProject = projects.get("test-project");
        assertNotNull(loadedTestProject);
        assertTrue(loadedTestProject.equals(testProject));
        OtherProject anotherLoadedTestProject = projects.get("another-test-project");
        assertNotNull(anotherLoadedTestProject);
        assertTrue(anotherLoadedTestProject.equals(anotherTestProject));
    }

    @Test
    public void testSortsProjectsByDate() {
        List<OtherProject> projectValues = new ArrayList(projects.values());
        assertEquals("test-project", projectValues.get(0).getId());
        assertEquals("another-test-project", projectValues.get(1).getId());
    }
}
