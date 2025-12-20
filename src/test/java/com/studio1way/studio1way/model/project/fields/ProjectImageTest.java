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
        image =
            new ProjectImage(
                "paintings/v47_workshop/main",
                ProjectImage.Extension.JPG,
                "test image"
            );
    }

    @Test
    public void testSizes() {
        assertEquals(
            "/img/projects/paintings/v47_workshop/main/100.jpg",
            image.getFull()
        );
        assertEquals("/img/projects/paintings/v47_workshop/main/50.jpg", image.getHalf());
        assertEquals(
            "/img/projects/paintings/v47_workshop/main/25.jpg",
            image.getQuarter()
        );
    }

    @Test
    public void testValidChecksForFileLocation() {
        assertTrue(image.valid());
        image.setPath("some/fake/path");
        assertFalse(image.valid());
    }

    @Test
    public void testValidChecksForAnimation() {
        image.setAnimation(
            new ProjectAnimation(
                "woodworks/some/fake/animation",
                "animation that doesnt exist"
            )
        );
        assertFalse(image.valid());
        image.setAnimation(
            new ProjectAnimation(
                "woodworks/shop_class_shelf/main/animation",
                "valid animation"
            )
        );
        assertTrue(image.valid());
    }

    @Test
    public void testNeverOverlapDefaultsToFalse() {
        assertFalse(image.getNeverOverlap());
        ProjectImage dontOverlapMe = new ProjectImage(
            "some/path",
            ProjectImage.Extension.PNG,
            "An X button will cover important details",
            true
        );
        assertTrue(dontOverlapMe.getNeverOverlap());
    }
}
