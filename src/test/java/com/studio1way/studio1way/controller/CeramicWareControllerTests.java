package com.studio1way.studio1way.controller;

import static org.mockito.ArgumentMatchers.anyString;

import com.studio1way.studio1way.model.project.CeramicWare;
import com.studio1way.studio1way.model.project.fields.Project3Dimension;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.service.CeramicWareService;
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
public class CeramicWareControllerTests {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockitoBean
    private CeramicWareService ceramicWareService;

    @BeforeEach
    public void setUp() {
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
        Mockito.when(ceramicWareService.findAll()).thenReturn(List.of(ceramicWare));
        Mockito.when(ceramicWareService.findById(anyString())).thenReturn(null);
        Mockito
            .when(ceramicWareService.findById("test-ceramicWare"))
            .thenReturn(ceramicWare);
    }

    @Test
    public void testCeramicWareByIdFound() throws Exception {
        String document =
            """
                query {
                    ceramicWare(id: "test-ceramicWare") {
                        name
                    }
                }
            """;

        graphQlTester
            .document(document)
            .execute()
            .path("data.ceramicWare.name")
            .entity(String.class)
            .isEqualTo("Test CeramicWare");
    }

    @Test
    public void testCeramicWareByIdNotFound() throws Exception {
        String document =
            """
                query {
                    ceramicWare(id: "something-bogus") {
                        name
                    }
                }
            """;

        graphQlTester.document(document).execute().path("data.ceramicWare").valueIsNull();
    }
}
