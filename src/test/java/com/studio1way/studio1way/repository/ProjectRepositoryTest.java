package com.studio1way.studio1way.repository;


import com.studio1way.studio1way.model.project.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ProjectRepositoryTest {

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    public void testAllProjects() {
        List<Project> projects = projectRepository.findAll();
        assertThat(projects.size()).isEqualTo(1);
    }

}
