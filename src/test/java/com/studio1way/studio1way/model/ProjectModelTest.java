package com.studio1way.studio1way.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ProjectModelTest {

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
                Project.Category.PAINTING,
                "A test project.",
                new String[] { "void" },
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
    public void testProjectImageSizes() {
        ProjectImage image = project.getImages()[0];
        assertEquals(image.getFull(), "/img/projects/some/path/100.png");
        assertEquals(image.getHalf(), "/img/projects/some/path/50.png");
        assertEquals(image.getQuarter(), "/img/projects/some/path/25.png");
    }

    @Test
    public void testProjectCanLoadFromJson() throws JsonProcessingException {
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
            "ext": "png",
            "alt": "test icon"
          },
          "links": [
            {
              "url": "https://something.com",
              "text": "example"
            }
          ],
          "date": "2025",
          "category": "PAINTING",
          "description": "A test project.",
          "materials": ["void"],
          "images": [
            {
              "path": "some/path",
              "ext": "png",
              "alt": "test image"
            }
          ]
        }
        """;
        Project pojoProject = objectMapper.readValue(jsonProject, Project.class);
        assertTrue(pojoProject.equals(project));
    }
}
