package com.studio1way.studio1way.controller;

import static org.mockito.ArgumentMatchers.anyString;

import com.studio1way.studio1way.model.project.WoodWork;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.service.WoodWorkService;
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
public class WoodWorkControllerTests {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockitoBean
    private WoodWorkService woodWorkService;

    @BeforeEach
    public void setUp() {
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
            12f,
            6.75f,
            2.5f
        );
        Mockito.when(woodWorkService.findAll()).thenReturn(List.of(woodWork));
        Mockito.when(woodWorkService.findById(anyString())).thenReturn(null);
        Mockito.when(woodWorkService.findById("test-woodWork")).thenReturn(woodWork);
    }

    @Test
    public void testWoodWorks() throws Exception {
        String document =
            """
                query {
                    woodWorks {
                        id
                    }
                }
            """;

        GraphQlTester.Response resp = graphQlTester.document(document).execute();
        resp.path("data.woodWorks").entityList(WoodWork.class).hasSize(1);
        resp.path("data.woodWorks[0].id").entity(String.class).isEqualTo("test-woodWork");
    }

    @Test
    public void testWoodWorkByIdFound() throws Exception {
        String document =
            """
                query {
                    woodWork(id: "test-woodWork") {
                        name
                    }
                }
            """;

        graphQlTester
            .document(document)
            .execute()
            .path("data.woodWork.name")
            .entity(String.class)
            .isEqualTo("Test WoodWork");
    }

    @Test
    public void testWoodWorkByIdNotFound() throws Exception {
        String document =
            """
                query {
                    woodWork(id: "something-bogus") {
                        name
                    }
                }
            """;

        graphQlTester.document(document).execute().path("data.woodWork").valueIsNull();
    }
}
