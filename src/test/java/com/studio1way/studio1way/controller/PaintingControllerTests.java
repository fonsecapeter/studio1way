package com.studio1way.studio1way.controller;

import static org.mockito.ArgumentMatchers.anyString;

import com.studio1way.studio1way.model.project.Painting;
import com.studio1way.studio1way.model.project.fields.Project2Dimension;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.service.PaintingService;
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
public class PaintingControllerTests {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockitoBean
    private PaintingService paintingService;

    @BeforeEach
    public void setUp() {
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
        Mockito.when(paintingService.findAll()).thenReturn(List.of(painting));
        Mockito.when(paintingService.findById(anyString())).thenReturn(null);
        Mockito.when(paintingService.findById("test-painting")).thenReturn(painting);
    }

    @Test
    public void testPaintingByIdNotFound() throws Exception {
        String document =
            """
                query {
                    painting(id: "something-bogus") {
                        name
                    }
                }
            """;

        graphQlTester.document(document).execute().path("data.painting").valueIsNull();
    }
}
