package com.studio1way.studio1way.repository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.studio1way.studio1way.model.project.Painting;
import com.studio1way.studio1way.repository.project.PaintingRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PaintingRepositoryTest {

    @Autowired
    private PaintingRepository paintingRepository;

    @Test
    public void testFindAll() {
        List<Painting> paintings = paintingRepository.findAll();
        assertEquals(12, paintings.size());
        // ordered by date DESC
        assertEquals("sf-bay", paintings.get(paintings.size() - 1).getId());
        assertEquals("one-ca", paintings.get(paintings.size() - 2).getId());
    }

    @Test
    public void testFindByIdFound() {
        Painting painting = paintingRepository.findById("v47-workshop");
        assertEquals("v47-workshop", painting.getId());
    }

    @Test
    public void testFindByIdNotFound() {
        Painting painting = paintingRepository.findById("something-bogus");
        assertThat(painting).isNull();
    }
}
