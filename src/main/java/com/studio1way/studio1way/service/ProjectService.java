package com.studio1way.studio1way.service;

import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.repository.project.CeramicWareRepository;
import com.studio1way.studio1way.repository.project.OtherProjectRepository;
import com.studio1way.studio1way.repository.project.PaintingRepository;
import com.studio1way.studio1way.repository.project.WoodWorkRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private final OtherProjectRepository otherProjectRepository;
    private final CeramicWareRepository ceramicWareRepository;
    private final PaintingRepository paintingRepository;
    private final WoodWorkRepository woodWorkRepository;

    @Autowired
    public ProjectService(
        OtherProjectRepository otherProjectRepository,
        CeramicWareRepository ceramicWareRepository,
        PaintingRepository paintingRepository,
        WoodWorkRepository woodWorkRepository
    ) {
        this.otherProjectRepository = otherProjectRepository;
        this.ceramicWareRepository = ceramicWareRepository;
        this.paintingRepository = paintingRepository;
        this.woodWorkRepository = woodWorkRepository;
    }

    public List<Project> findAll() {
        List<Project> projects = new ArrayList<>();
        projects.addAll(otherProjectRepository.findAll());
        projects.addAll(ceramicWareRepository.findAll());
        projects.addAll(paintingRepository.findAll());
        projects.addAll(woodWorkRepository.findAll());
        Collections.sort(projects, Collections.reverseOrder());
        return projects;
    }
}
