package com.studio1way.studio1way.model.project;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.studio1way.studio1way.model.project.fields.ProjectImage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ProjectImageTest {

    private ProjectImage image;

    @BeforeEach
    public void setUp() {
        image = new ProjectImage("some/path", ProjectImage.Extension.PNG, "test image");
    }

    @Test
    public void testProjectImageSizes() {
        assertEquals(image.getFull(), "/img/projects/some/path/100.png");
        assertEquals(image.getHalf(), "/img/projects/some/path/50.png");
        assertEquals(image.getQuarter(), "/img/projects/some/path/25.png");
    }
}
