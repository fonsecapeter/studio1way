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
                new ProjectImage("some/path", ProjectImage.Extension.PNG, "test icon"),
                new ProjectLink[] { new ProjectLink("https://something.com", "example") },
                "2025",
                "A test painting.",
                new ProjectImage[] {
                    new ProjectImage(
                        "some/path",
                        ProjectImage.Extension.PNG,
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
            "path": "some/path",
            "ext": "PNG",
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
              "path": "some/path",
              "ext": "PNG",
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

    @Test
    public void testProjectImageSizes() {
        ProjectImage image = painting.getImages()[0];
        assertEquals(image.getFull(), "/img/projects/some/path/100.png");
        assertEquals(image.getHalf(), "/img/projects/some/path/50.png");
        assertEquals(image.getQuarter(), "/img/projects/some/path/25.png");
    }

    @Test
    public void testDateFormatIsValidated() {
        String[] validDates = { "2024", "2024-01", "2024-01-01" };
        String[] invalidDates = {
            "2025/01/01",
            "25-01-01",
            "2025-1",
            "2025-01-1",
            "January First, 2025",
        };
        for (String validDate : validDates) {
            painting.setDate(validDate);
        }
        for (String invalidDate : invalidDates) {
            assertThrows(
                IllegalArgumentException.class,
                () -> {
                    painting.setDate(invalidDate);
                },
                String.format(
                    "Expected %s to fail validation, but it passed",
                    invalidDate
                )
            );
        }
    }
}
