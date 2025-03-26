package com.studio1way.studio1way.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import com.studio1way.studio1way.model.project.WoodWork;
import com.studio1way.studio1way.model.project.fields.Project3Dimension;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.repository.project.WoodWorkRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class WoodWorkServiceTest {

    @InjectMocks
    private WoodWorkService ceramicWareService;

    @Mock
    private WoodWorkRepository ceramicWareRepository;

    private WoodWork woodWork = new WoodWork(
        "test-woodWork",
        "Test WoodWork",
        new ProjectImage(
            "woodworks/shop_class_shelf/main",
            ProjectImage.Extension.JPG,
            "test icon"
        ),
        new ProjectLink[] { new ProjectLink("https://something.com", "example") },
        "2025",
        "A test woodWork.",
        new ProjectImage[] {
            new ProjectImage(
                "woodworks/shop_class_shelf/main",
                ProjectImage.Extension.JPG,
                "test image"
            ),
        },
        "3/4\" 7ply AC Fir",
        WoodWork.Finish.PASTE_WAX,
        new Project3Dimension(12f, 6.75f, 2.5f)
    );

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        when(ceramicWareRepository.findAll()).thenReturn(List.of(woodWork));
        when(ceramicWareRepository.findById(anyString())).thenReturn(null);
        when(ceramicWareRepository.findById("test-woodWork")).thenReturn(woodWork);
    }

    @Test
    public void testFindAll() {
        List<WoodWork> ceramicWares = ceramicWareService.findAll();
        assertEquals(1, ceramicWares.size());
        assertTrue(ceramicWares.get(0).equals(woodWork));
    }

    @Test
    public void testFindByIdFound() {
        WoodWork loadedWoodWork = ceramicWareService.findById("test-woodWork");
        assertTrue(loadedWoodWork.equals(woodWork));
    }

    @Test
    public void testFindByIdNotFound() {
        WoodWork loadedWoodWork = ceramicWareService.findById("something-bogus");
        assertNull(loadedWoodWork);
    }
}
