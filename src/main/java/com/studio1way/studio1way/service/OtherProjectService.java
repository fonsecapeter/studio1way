package com.studio1way.studio1way.service;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.repository.project.ProjectRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtherProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public OtherProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public Project findById(String id) {
        return projectRepository.findById(id);
    }
}
