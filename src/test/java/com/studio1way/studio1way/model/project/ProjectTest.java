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

public class ProjectTest {

    private Project project;

    @BeforeEach
    public void setUp() {
        project =
            new Project(
                "test-project",
                "Test Project",
                new ProjectImage("some/path", ProjectImage.Extension.PNG, "test icon"),
                new ProjectLink[] { new ProjectLink("https://something.com", "example") },
                "2025",
                "A test project.",
                new ProjectImage[] {
                    new ProjectImage(
                        "some/path",
                        ProjectImage.Extension.PNG,
                        "test image"
                    ),
                }
            );
    }

    @Test
    public void testProjectCanLoadFromJson() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
        String jsonProject =
            """
        {
          "id": "test-project",
          "name": "Test Project",
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
          "description": "A test project.",
          "images": [
            {
              "path": "some/path",
              "ext": "PNG",
              "alt": "test image"
            }
          ]
        }
        """;
        Project pojoProject = objectMapper.readValue(jsonProject, Project.class);
        assertTrue(pojoProject.equals(project));
    }

    @Test
    public void testProjectImageSizes() {
        ProjectImage image = project.getImages()[0];
        assertEquals("/img/projects/some/path/100.png", image.getFull());
        assertEquals("/img/projects/some/path/50.png", image.getHalf());
        assertEquals("/img/projects/some/path/25.png", image.getQuarter());
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
            project.setDate(validDate);
        }
        for (String invalidDate : invalidDates) {
            assertThrows(
                IllegalArgumentException.class,
                () -> {
                    project.setDate(invalidDate);
                },
                String.format(
                    "Expected %s to fail validation, but it passed",
                    invalidDate
                )
            );
        }
    }
}
