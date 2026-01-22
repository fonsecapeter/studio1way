package com.studio1way.studio1way.repository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.studio1way.studio1way.model.project.OtherProject;
import com.studio1way.studio1way.repository.project.OtherProjectRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class OtherProjectRepositoryTest {

    @Autowired
    private OtherProjectRepository otherProjectRepository;

    @Test
    public void testFindAll() {
        List<OtherProject> projects = otherProjectRepository.findAll();
        assertEquals(11, projects.size());
        // ordered by date DESC
        assertEquals("2085", projects.get(projects.size() - 1).getId());
        assertEquals("my-brain", projects.get(projects.size() - 2).getId());
    }

    @Test
    public void testFindByIdFound() {
        OtherProject project = otherProjectRepository.findById("my-brain");
        assertEquals("my-brain", project.getId());
    }

    @Test
    public void testFindByIdNotFound() {
        OtherProject project = otherProjectRepository.findById("something-bogus");
        assertThat(project).isNull();
    }
}
