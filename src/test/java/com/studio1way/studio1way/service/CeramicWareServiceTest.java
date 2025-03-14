package com.studio1way.studio1way.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import com.studio1way.studio1way.model.project.CeramicWare;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.repository.project.CeramicWareRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class CeramicWareServiceTest {

    @InjectMocks
    private CeramicWareService ceramicWareService;

    @Mock
    private CeramicWareRepository ceramicWareRepository;

    private CeramicWare ceramicWare = new CeramicWare(
        "test-ceramicWare",
        "Test CeramicWare",
        new ProjectImage(
            "paintings/v47_workshop/main",
            ProjectImage.Extension.JPG,
            "test icon"
        ),
        new ProjectLink[] { new ProjectLink("https://something.com", "example") },
        "2025",
        "A test ceramicWare.",
        new ProjectImage[] {
            new ProjectImage(
                "paintings/v47_workshop/main",
                ProjectImage.Extension.JPG,
                "test image"
            ),
        },
        CeramicWare.ClayBody.GRAY_STONEWARE,
        "cream",
        4f,
        2f,
        2f
    );

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        when(ceramicWareRepository.findAll()).thenReturn(List.of(ceramicWare));
        when(ceramicWareRepository.findById(anyString())).thenReturn(null);
        when(ceramicWareRepository.findById("test-ceramicWare")).thenReturn(ceramicWare);
    }

    @Test
    public void testFindAll() {
        List<CeramicWare> ceramicWares = ceramicWareService.findAll();
        assertEquals(1, ceramicWares.size());
        assertTrue(ceramicWares.get(0).equals(ceramicWare));
    }

    @Test
    public void testFindByIdFound() {
        CeramicWare loadedCeramicWare = ceramicWareService.findById("test-ceramicWare");
        assertTrue(loadedCeramicWare.equals(ceramicWare));
    }

    @Test
    public void testFindByIdNotFound() {
        CeramicWare loadedCeramicWare = ceramicWareService.findById("something-bogus");
        assertNull(loadedCeramicWare);
    }
}
