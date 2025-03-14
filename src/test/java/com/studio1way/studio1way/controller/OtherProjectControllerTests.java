package com.studio1way.studio1way.controller;

import static org.mockito.ArgumentMatchers.anyString;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.service.ProjectService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
@AutoConfigureGraphQlTester
public class OtherProjectControllerTests {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockitoBean
    private ProjectService projectService;

    @BeforeEach
    public void setUp() {
        Project project = new Project(
            "test-project",
            "Test Project",
            new ProjectImage(
                "others/my_brain/main",
                ProjectImage.Extension.JPG,
                "test icon"
            ),
            new ProjectLink[] { new ProjectLink("https://something.com", "examples") },
            "2025-01-01",
            "A test project.",
            new ProjectImage[] {
                new ProjectImage(
                    "others/my_brain/main",
                    ProjectImage.Extension.JPG,
                    "test image"
                ),
            }
        );
        Mockito.when(projectService.findAll()).thenReturn(List.of(project));
        Mockito.when(projectService.findById(anyString())).thenReturn(null);
        Mockito.when(projectService.findById("test-project")).thenReturn(project);
    }

    @Test
    public void testProjects() throws Exception {
        String document =
            """
                query {
                    otherProjects {
                        id
                    }
                }
            """;

        GraphQlTester.Response resp = graphQlTester.document(document).execute();
        resp.path("data.otherProjects").entityList(Project.class).hasSize(1);
        resp
            .path("data.otherProjects[0].id")
            .entity(String.class)
            .isEqualTo("test-project");
    }

    @Test
    public void testProjectByIdFound() throws Exception {
        String document =
            """
                query {
                    otherProject(id: "test-project") {
                        name
                    }
                }
            """;

        graphQlTester
            .document(document)
            .execute()
            .path("data.otherProject.name")
            .entity(String.class)
            .isEqualTo("Test Project");
    }

    @Test
    public void testProjectByIdNotFound() throws Exception {
        String document =
            """
                query {
                    otherProject(id: "something-bogus") {
                        name
                    }
                }
            """;

        graphQlTester
            .document(document)
            .execute()
            .path("data.otherProject")
            .valueIsNull();
    }
}
