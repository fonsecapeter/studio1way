package com.studio1way.studio1way.controller;

import static org.mockito.ArgumentMatchers.anyString;

import com.studio1way.studio1way.model.project.CeramicWare;
import com.studio1way.studio1way.model.project.OtherProject;
import com.studio1way.studio1way.model.project.Painting;
import com.studio1way.studio1way.model.project.WoodWork;
import com.studio1way.studio1way.model.project.fields.Project2Dimension;
import com.studio1way.studio1way.model.project.fields.Project3Dimension;
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
public class ProjectControllerTests {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockitoBean
    private ProjectService projectService;

    @BeforeEach
    public void setUp() {
        OtherProject project = new OtherProject(
            "test-project",
            "Test Project",
            new ProjectImage(
                "other/my_brain/main",
                ProjectImage.Extension.JPG,
                "test icon"
            ),
            new ProjectLink[] { new ProjectLink("https://something.com", "examples") },
            "2025-01-01",
            "A test project.",
            new ProjectImage[] {
                new ProjectImage(
                    "other/my_brain/main",
                    ProjectImage.Extension.JPG,
                    "test image"
                ),
            }
        );
        CeramicWare ceramicWare = new CeramicWare(
            "test-ceramicWare",
            "Test CeramicWare",
            new ProjectImage(
                "ceramicwares/espresso_cup/main",
                ProjectImage.Extension.JPG,
                "test icon"
            ),
            new ProjectLink[] { new ProjectLink("https://something.com", "example") },
            "2025",
            "A test ceramicWare.",
            new ProjectImage[] {
                new ProjectImage(
                    "ceramicwares/espresso_cup/main",
                    ProjectImage.Extension.JPG,
                    "test image"
                ),
            },
            CeramicWare.ClayBody.GRAY_STONEWARE,
            "cream",
            new Project3Dimension(4f, 2f, 2f)
        );
        WoodWork woodWork = new WoodWork(
            "test-woodWork",
            "Test WoodWork",
            new ProjectImage(
                "woodworks/shop_class_shelf/main",
                ProjectImage.Extension.JPG,
                "test icon"
            ),
            new ProjectLink[] { new ProjectLink("https://something.com", "example") },
            "2025",
            "A test woodWork.",
            new ProjectImage[] {
                new ProjectImage(
                    "woodworks/shop_class_shelf/main",
                    ProjectImage.Extension.JPG,
                    "test image"
                ),
            },
            "3/4\" 7ply AC Fir",
            WoodWork.Finish.PASTE_WAX,
            new Project3Dimension(12f, 6.75f, 2.5f)
        );
        Painting painting = new Painting(
            "test-painting",
            "Test Painting",
            new ProjectImage(
                "paintings/v47_workshop/main",
                ProjectImage.Extension.JPG,
                "test icon"
            ),
            new ProjectLink[] { new ProjectLink("https://something.com", "example") },
            "2025",
            "A test painting.",
            new ProjectImage[] {
                new ProjectImage(
                    "paintings/v47_workshop/main",
                    ProjectImage.Extension.JPG,
                    "test image"
                ),
            },
            "canvas",
            Painting.Medium.OIL,
            false,
            new Project2Dimension(12.5f, 12f)
        );
        Mockito
            .when(projectService.findAll())
            .thenReturn(List.of(project, ceramicWare, woodWork, painting));
    }

    @Test
    public void testProjects() throws Exception {
        String document =
            """
                query {
                    projects {
                        id
                    }
                }
            """;

        GraphQlTester.Response resp = graphQlTester.document(document).execute();
        resp.path("data.projects").entityList(Object.class).hasSize(4);
        resp.path("data.projects[0].id").entity(String.class).isEqualTo("test-project");
        resp
            .path("data.projects[1].id")
            .entity(String.class)
            .isEqualTo("test-ceramicWare");
        resp.path("data.projects[2].id").entity(String.class).isEqualTo("test-woodWork");
        resp.path("data.projects[3].id").entity(String.class).isEqualTo("test-painting");
    }
}
