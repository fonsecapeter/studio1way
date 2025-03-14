package com.studio1way.studio1way.service;

import com.studio1way.studio1way.model.project.WoodWork;
import com.studio1way.studio1way.repository.project.WoodWorkRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WoodWorkService {

    private final WoodWorkRepository woodWorkRepository;

    @Autowired
    public WoodWorkService(WoodWorkRepository woodWorkRepository) {
        this.woodWorkRepository = woodWorkRepository;
    }

    public List<WoodWork> findAll() {
        return woodWorkRepository.findAll();
    }

    public WoodWork findById(String id) {
        return woodWorkRepository.findById(id);
    }
}
