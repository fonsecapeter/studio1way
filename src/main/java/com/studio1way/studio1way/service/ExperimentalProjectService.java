package com.studio1way.studio1way.service;

import com.studio1way.studio1way.model.project.ExperimentalProject;
import com.studio1way.studio1way.repository.project.ExperimentalProjectRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExperimentalProjectService {

    private final ExperimentalProjectRepository otherProjectRepository;

    @Autowired
    public ExperimentalProjectService(
        ExperimentalProjectRepository otherProjectRepository
    ) {
        this.otherProjectRepository = otherProjectRepository;
    }

    public List<ExperimentalProject> findAll() {
        return otherProjectRepository.findAll();
    }

    public ExperimentalProject findById(String id) {
        return otherProjectRepository.findById(id);
    }
}
