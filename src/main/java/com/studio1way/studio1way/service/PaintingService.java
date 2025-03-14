package com.studio1way.studio1way.service;

import com.studio1way.studio1way.model.project.Painting;
import com.studio1way.studio1way.repository.project.PaintingRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaintingService {

    private final PaintingRepository paintingRepository;

    @Autowired
    public PaintingService(PaintingRepository paintingRepository) {
        this.paintingRepository = paintingRepository;
    }

    public List<Painting> findAll() {
        return paintingRepository.findAll();
    }

    public Painting findById(String id) {
        return paintingRepository.findById(id);
    }
}
