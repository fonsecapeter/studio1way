package com.studio1way.studio1way.service;

import com.studio1way.studio1way.model.project.OtherProject;
import com.studio1way.studio1way.repository.project.OtherProjectRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtherProjectService {

    private final OtherProjectRepository otherProjectRepository;

    @Autowired
    public OtherProjectService(OtherProjectRepository otherProjectRepository) {
        this.otherProjectRepository = otherProjectRepository;
    }

    public List<OtherProject> findAll() {
        return otherProjectRepository.findAll();
    }

    public OtherProject findById(String id) {
        return otherProjectRepository.findById(id);
    }
}
