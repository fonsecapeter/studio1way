package com.studio1way.studio1way.controller;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.ProjectCategory;
import com.studio1way.studio1way.model.project.ProjectLink;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {

    @GetMapping("/projects")
    public List<Project> listProjects() {
        ProjectLink[] links = {new ProjectLink(
            "https://www.behance.net/gallery/41763273/My-Brain",
            "behance"
        )};
        return List.of(
            new Project(
                "my-brain",
                "My Brain",
                links,
                LocalDate.now(),
                ProjectCategory.SCULPTURE,
                "I used to run MRIs at UCSF."
            )
        );
    }
}
