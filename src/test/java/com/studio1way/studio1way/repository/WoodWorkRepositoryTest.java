package com.studio1way.studio1way.repository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.studio1way.studio1way.model.project.WoodWork;
import com.studio1way.studio1way.repository.project.WoodWorkRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class WoodWorkRepositoryTest {

    @Autowired
    private WoodWorkRepository woodWorkRepository;

    @Test
    public void testFindAll() {
        List<WoodWork> woodWorks = woodWorkRepository.findAll();
        assertEquals(2, woodWorks.size());
        // ordered by date DESC
        assertEquals("shop-class-shelf", woodWorks.get(woodWorks.size() - 1).getId());
        assertEquals("workbench", woodWorks.get(woodWorks.size() - 2).getId());
    }

    @Test
    public void testFindByIdFound() {
        WoodWork woodWork = woodWorkRepository.findById("shop-class-shelf");
        assertEquals("shop-class-shelf", woodWork.getId());
    }

    @Test
    public void testFindByIdNotFound() {
        WoodWork woodWork = woodWorkRepository.findById("something-bogus");
        assertThat(woodWork).isNull();
    }
}
