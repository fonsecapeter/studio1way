package com.studio1way.studio1way.model.project;

import static org.junit.jupiter.api.Assertions.*;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import java.io.IOException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PaintingTest {

    private Painting painting;

    @BeforeEach
    public void setUp() {
        painting =
            new Painting(
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
                12.5f,
                12f
            );
    }

    @Test
    public void testPaintingCanLoadFromJson() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
        String jsonPainting =
            """
        {
          "id": "test-painting",
          "name": "Test Painting",
          "icon": {
            "path": "paintings/v47_workshop/main",
            "ext": "JPG",
            "alt": "test icon"
          },
          "links": [
            {
              "url": "https://something.com",
              "text": "example"
            }
          ],
          "date": "2025",
          "description": "A test painting.",
          "images": [
            {
              "path": "paintings/v47_workshop/main",
              "ext": "JPG",
              "alt": "test image"
            }
          ],
          "surface": "canvas",
          "medium": "OIL",
          "varnished": false,
          "height": 12.5,
          "width": 12
        }
        """;
        Painting pojoPainting = objectMapper.readValue(jsonPainting, Painting.class);
        assertTrue(pojoPainting.equals(painting));
    }
}
