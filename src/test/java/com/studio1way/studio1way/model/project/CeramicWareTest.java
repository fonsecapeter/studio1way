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

public class CeramicWareTest {

    private CeramicWare ceramicWare;

    @BeforeEach
    public void setUp() {
        ceramicWare =
            new CeramicWare(
                "test-ceramicWare",
                "Test CeramicWare",
                new ProjectImage("some/path", ProjectImage.Extension.PNG, "test icon"),
                new ProjectLink[] { new ProjectLink("https://something.com", "example") },
                "2025",
                "A test ceramicWare.",
                new ProjectImage[] {
                    new ProjectImage(
                        "some/path",
                        ProjectImage.Extension.PNG,
                        "test image"
                    ),
                },
                CeramicWare.ClayBody.GRAY_STONEWARE,
                "cream",
                4f,
                2f,
                2f
            );
    }

    @Test
    public void testCeramicWareCanLoadFromJson() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
        String jsonCeramicWare =
            """
        {
          "id": "test-ceramicWare",
          "name": "Test CeramicWare",
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
          "description": "A test ceramicWare.",
          "images": [
            {
              "path": "some/path",
              "ext": "PNG",
              "alt": "test image"
            }
          ],
          "clayBody": "GRAY_STONEWARE",
          "glaze": "cream",
          "height": 4,
          "width": 2,
          "depth": 2
        }
        """;
        CeramicWare pojoCeramicWare = objectMapper.readValue(
            jsonCeramicWare,
            CeramicWare.class
        );
        assertTrue(pojoCeramicWare.equals(ceramicWare));
    }
}
