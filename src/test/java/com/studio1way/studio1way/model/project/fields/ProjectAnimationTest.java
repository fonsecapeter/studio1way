package com.studio1way.studio1way.model.project.fields;

import static graphql.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ProjectAnimationTest {

    private ProjectAnimation animation;

    @BeforeEach
    public void setUp() {
        animation =
            new ProjectAnimation(
                "woodworks/shop_class_shelf/main/animation",
                "test animation"
            );
    }

    @Test
    public void testSizes() {
        assertEquals(
            "/img/projects/woodworks/shop_class_shelf/main/animation/100.gif",
            animation.getFull()
        );
        assertEquals(
            "/img/projects/woodworks/shop_class_shelf/main/animation/50.gif",
            animation.getHalf()
        );
    }

    @Test
    public void testValidChecksForFileLocation() {
        assertTrue(animation.valid());
        animation.setPath("some/fake/path");
        assertFalse(animation.valid());
    }

    @Test
    public void testValidFileLocationMustBeGif() {
        assertTrue(animation.valid());
        animation.setPath("paintings/v47_workshop/main");
        assertFalse(animation.valid());
    }
}
