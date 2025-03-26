package com.studio1way.studio1way.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import com.studio1way.studio1way.model.project.Painting;
import com.studio1way.studio1way.model.project.fields.Project2Dimension;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.repository.project.PaintingRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class PaintingServiceTest {

    @InjectMocks
    private PaintingService paintingService;

    @Mock
    private PaintingRepository paintingRepository;

    private Painting painting = new Painting(
        "test-painting",
        "Test Painting",
        new ProjectImage(
            "paintings/v47_workshop/main",
            ProjectImage.Extension.JPG,
            "test icon"
        ),
        new ProjectLink[] { new ProjectLink("https://something.com", "example") },
        "2025",
        "A test painting.",
        new ProjectImage[] {
            new ProjectImage(
                "paintings/v47_workshop/main",
                ProjectImage.Extension.JPG,
                "test image"
            ),
        },
        "canvas",
        Painting.Medium.OIL,
        false,
        new Project2Dimension(12.5f, 12f)
    );

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        when(paintingRepository.findAll()).thenReturn(List.of(painting));
        when(paintingRepository.findById(anyString())).thenReturn(null);
        when(paintingRepository.findById("test-painting")).thenReturn(painting);
    }

    @Test
    public void testFindAll() {
        List<Painting> paintings = paintingService.findAll();
        assertEquals(1, paintings.size());
        assertTrue(paintings.get(0).equals(painting));
    }

    @Test
    public void testFindByIdFound() {
        Painting loadedPainting = paintingService.findById("test-painting");
        assertTrue(loadedPainting.equals(painting));
    }

    @Test
    public void testFindByIdNotFound() {
        Painting loadedPainting = paintingService.findById("something-bogus");
        assertNull(loadedPainting);
    }
}
