package com.studio1way.studio1way.model.project;

import static org.junit.jupiter.api.Assertions.*;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.model.project.fields.ProjectVideo;
import java.io.IOException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class OtherProjectTest {

    private OtherProject project;
    private OtherProject filmProject;

    @BeforeEach
    public void setUp() {
        project =
            new OtherProject(
                "test-project",
                "Test Project",
                new ProjectImage(
                    "other/my_brain/main",
                    ProjectImage.Extension.JPG,
                    "test icon"
                ),
                new ProjectLink[] { new ProjectLink("https://something.com", "example") },
                "2025",
                "A test project.",
                new ProjectImage[] {
                    new ProjectImage(
                        "other/my_brain/main",
                        ProjectImage.Extension.JPG,
                        "test image"
                    ),
                },
                "digital"
            );
        filmProject =
            new OtherProject(
                "test-film-project",
                "Test Film Project",
                new ProjectImage(
                    "other/my_brain/main",
                    ProjectImage.Extension.JPG,
                    "test icon"
                ),
                new ProjectLink[] { new ProjectLink("https://something.com", "example") },
                "2025",
                "A test project.",
                new ProjectImage[] {
                    new ProjectImage(
                        "other/my_brain/main",
                        ProjectImage.Extension.JPG,
                        "test image"
                    ),
                },
                "YouTube",
                new ProjectVideo("https://avideo.com", ProjectVideo.AspectRatio.WIDE)
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
            "path": "other/my_brain/main",
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
          "description": "A test project.",
          "images": [
            {
              "path": "other/my_brain/main",
              "ext": "JPG",
              "alt": "test image"
            }
          ],
          "variety": "digital"
        }
        """;
        OtherProject pojoProject = objectMapper.readValue(
            jsonProject,
            OtherProject.class
        );
        assertTrue(pojoProject.equals(project));
    }

    @Test
    public void testProjectWithVideoCanLoadFromJson() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
        String jsonProject =
            """
        {
          "id": "test-film-project",
          "name": "Test Film Project",
          "icon": {
            "path": "other/my_brain/main",
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
          "description": "A test project.",
          "images": [
            {
              "path": "other/my_brain/main",
              "ext": "JPG",
              "alt": "test image"
            }
          ],
          "variety": "YouTube",
          "video": {
            "src": "https://avideo.com",
            "aspectRatio": "WIDE"
          }
        }
        """;
        OtherProject pojoProject = objectMapper.readValue(
            jsonProject,
            OtherProject.class
        );
        assertTrue(pojoProject.equals(filmProject));
    }

    @Test
    public void testDateFormatIsValidatedInSetter() {
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

    @Test
    public void testImagePathsAreValidatedInSetter() {
        assertThrows(
            IllegalArgumentException.class,
            () -> {
                project.setImages(
                    new ProjectImage[] {
                        new ProjectImage(
                            "some/path",
                            ProjectImage.Extension.PNG,
                            "path that doesnt exist"
                        ),
                    }
                );
            }
        );
        assertThrows(
            IllegalArgumentException.class,
            () -> {
                project.setImages(
                    new ProjectImage[] {
                        new ProjectImage(
                            "other/my_brain/main",
                            ProjectImage.Extension.PNG,
                            "path that exist but with a different ext"
                        ),
                    }
                );
            }
        );
        project.setImages(
            new ProjectImage[] {
                new ProjectImage(
                    "other/my_brain/main",
                    ProjectImage.Extension.JPG,
                    "this exists and should work"
                ),
            }
        );
    }
}
