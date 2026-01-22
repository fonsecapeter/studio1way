package com.studio1way.studio1way.repository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.studio1way.studio1way.model.project.ExperimentalProject;
import com.studio1way.studio1way.repository.project.ExperimentalProjectRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ExperimentalProjectRepositoryTest {

    @Autowired
    private ExperimentalProjectRepository otherProjectRepository;

    @Test
    public void testFindAll() {
        List<ExperimentalProject> projects = otherProjectRepository.findAll();
        assertEquals(11, projects.size());
        // ordered by date DESC
        assertEquals("2085", projects.get(projects.size() - 1).getId());
        assertEquals("my-brain", projects.get(projects.size() - 2).getId());
    }

    @Test
    public void testFindByIdFound() {
        ExperimentalProject project = otherProjectRepository.findById("my-brain");
        assertEquals("my-brain", project.getId());
    }

    @Test
    public void testFindByIdNotFound() {
        ExperimentalProject project = otherProjectRepository.findById("something-bogus");
        assertThat(project).isNull();
    }
}
