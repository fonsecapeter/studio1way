package com.studio1way.studio1way.controller;

import static org.mockito.ArgumentMatchers.anyString;

import com.studio1way.studio1way.model.project.ExperimentalProject;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.service.ExperimentalProjectService;
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
public class ExperimentalProjectControllerTests {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockitoBean
    private ExperimentalProjectService experimentalProjectService;

    @BeforeEach
    public void setUp() {
        ExperimentalProject project = new ExperimentalProject(
            "test-project",
            "Test Project",
            new ProjectImage(
                "experiments/my_brain/main",
                ProjectImage.Extension.JPG,
                "test icon"
            ),
            new ProjectLink[] { new ProjectLink("https://something.com", "examples") },
            "2025-01-01",
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
        Mockito.when(experimentalProjectService.findAll()).thenReturn(List.of(project));
        Mockito.when(experimentalProjectService.findById(anyString())).thenReturn(null);
        Mockito
            .when(experimentalProjectService.findById("test-project"))
            .thenReturn(project);
    }

    @Test
    public void testProjectByIdFound() throws Exception {
        String document =
            """
                query {
                    experimentalProject(id: "test-project") {
                        name
                    }
                }
            """;

        graphQlTester
            .document(document)
            .execute()
            .path("data.experimentalProject.name")
            .entity(String.class)
            .isEqualTo("Test Project");
    }

    @Test
    public void testProjectByIdNotFound() throws Exception {
        String document =
            """
                query {
                    experimentalProject(id: "something-bogus") {
                        name
                    }
                }
            """;

        graphQlTester
            .document(document)
            .execute()
            .path("data.experimentalProject")
            .valueIsNull();
    }
}
