package com.studio1way.studio1way.service;

import com.studio1way.studio1way.model.project.CeramicWare;
import com.studio1way.studio1way.model.project.Painting;
import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.WoodWork;
import com.studio1way.studio1way.model.project.fields.ProjectAnimation;
import com.studio1way.studio1way.repository.project.CeramicWareRepository;
import com.studio1way.studio1way.repository.project.PaintingRepository;
import com.studio1way.studio1way.repository.project.ProjectRepository;
import com.studio1way.studio1way.repository.project.WoodWorkRepository;
import java.awt.*;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final CeramicWareRepository ceramicWareRepository;
    private final PaintingRepository paintingRepository;
    private final WoodWorkRepository woodWorkRepository;

    @Autowired
    public ProjectService(
        ProjectRepository projectRepository,
        CeramicWareRepository ceramicWareRepository,
        PaintingRepository paintingRepository,
        WoodWorkRepository woodWorkRepository
    ) {
        this.projectRepository = projectRepository;
        this.ceramicWareRepository = ceramicWareRepository;
        this.paintingRepository = paintingRepository;
        this.woodWorkRepository = woodWorkRepository;
    }

    public List<Project> findAll() {
        List<Project> projects = projectRepository.findAll();
        projects.addAll(ceramicWareRepository.findAll());
        projects.addAll(paintingRepository.findAll());
        projects.addAll(woodWorkRepository.findAll());
        Collections.sort(projects, Comparator.comparing(Project::getDate));
        return projects;
    }
}
