package com.studio1way.studio1way.controller;


import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.ProjectCategory;
import com.studio1way.studio1way.model.project.ProjectLink;
import com.studio1way.studio1way.service.ProjectService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;
import java.util.List;

@WebMvcTest(ProjectController.class)
public class ProjectControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService projectService;

    @Test
    public void testAllProjects() throws Exception {
        List<Project> projects = List.of(
            new Project(
                "test-project",
                "Test Project",
                new ProjectLink[] {
                    new ProjectLink(
                         "https://something.com",
                         "examples"
                    )
                },
                LocalDate.now(),
                ProjectCategory.PAINTING,
                "A test project."
            )
        );
        Mockito.when(projectService.allProjects()).thenReturn(projects);

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/projects").accept(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isOk()
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$[0].id").value("test-project")
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$[0].name").value("Test Project")
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$[0].category").value("painting")
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$[0].description").value("A test project.")
        );
    }
}
