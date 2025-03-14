package com.studio1way.studio1way.model.project.fields;

import static graphql.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ProjectImageTest {

    private ProjectImage image;

    @BeforeEach
    public void setUp() {
        image = new ProjectImage("some/path", ProjectImage.Extension.JPG, "test image");
    }

    @Test
    public void testSizes() {
        assertEquals("/img/projects/some/path/100.jpg", image.getFull());
        assertEquals("/img/projects/some/path/50.jpg", image.getHalf());
        assertEquals("/img/projects/some/path/25.jpg", image.getQuarter());
    }

    @Test
    public void testValidChecksForFileLocation() {
        assertFalse(image.valid());
        image.setPath("paintings/v47_workshop/main");
        assertTrue(image.valid());
    }
}
