package com.studio1way.studio1way.repository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.studio1way.studio1way.model.project.CeramicWare;
import com.studio1way.studio1way.repository.project.CeramicWareRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CeramicWareRepositoryTest {

    @Autowired
    private CeramicWareRepository ceramicWareRepository;

    @Test
    public void testFindAll() {
        List<CeramicWare> ceramicWares = ceramicWareRepository.findAll();
        assertThat(ceramicWares.size()).isGreaterThan(4);
        // ordered by date DESC else id ASC
        assertEquals("desk-set", ceramicWares.get(ceramicWares.size() - 1).getId());
        assertEquals("garlic-grater", ceramicWares.get(ceramicWares.size() - 2).getId());
    }

    @Test
    public void testFindByIdFound() {
        CeramicWare ceramicWare = ceramicWareRepository.findById("paint-set");
        assertEquals("paint-set", ceramicWare.getId());
    }

    @Test
    public void testFindByIdNotFound() {
        CeramicWare ceramicWare = ceramicWareRepository.findById("something-bogus");
        assertThat(ceramicWare).isNull();
    }
}
