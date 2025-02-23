package com.studio1way.studio1way.repository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.repository.project.ProjectRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ProjectRepositoryTest {

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    public void testFindAll() {
        List<Project> projects = projectRepository.findAll();
        assertEquals(projects.size(), 2);
        assertEquals(projects.get(0).getId(), "my-brain");
        assertEquals(projects.get(1).getId(), "workbench");
    }

    @Test
    public void testFindByIdFound() {
        Project project = projectRepository.findById("workbench");
        assertEquals(project.getId(), "workbench");
    }

    @Test
    public void testFindByIdNotFound() {
        Project project = projectRepository.findById("something-bogus");
        assertThat(project).isNull();
    }
}
