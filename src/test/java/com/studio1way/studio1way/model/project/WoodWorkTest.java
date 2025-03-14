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

public class WoodWorkTest {

    private WoodWork woodWork;

    @BeforeEach
    public void setUp() {
        woodWork =
            new WoodWork(
                "test-woodWork",
                "Test WoodWork",
                new ProjectImage(
                    "paintings/v47_workshop/main",
                    ProjectImage.Extension.JPG,
                    "test icon"
                ),
                new ProjectLink[] { new ProjectLink("https://something.com", "example") },
                "2025",
                "A test woodWork.",
                new ProjectImage[] {
                    new ProjectImage(
                        "paintings/v47_workshop/main",
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
    }

    @Test
    public void testWoodWorkCanLoadFromJson() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
        String jsonWoodWork =
            """
        {
          "id": "test-woodWork",
          "name": "Test WoodWork",
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
          "description": "A test woodWork.",
          "images": [
            {
              "path": "paintings/v47_workshop/main",
              "ext": "JPG",
              "alt": "test image"
            }
          ],
          "materials": "3/4\\\" 7ply AC Fir",
          "finish": "PASTE_WAX",
          "height": 12,
          "width": 6.75,
          "depth": 2.5
        }
        """;
        WoodWork pojoWoodWork = objectMapper.readValue(jsonWoodWork, WoodWork.class);
        assertTrue(pojoWoodWork.equals(woodWork));
    }
}
