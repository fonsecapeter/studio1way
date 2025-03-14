package com.studio1way.studio1way.service;

import com.studio1way.studio1way.model.project.CeramicWare;
import com.studio1way.studio1way.repository.project.CeramicWareRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CeramicWareService {

    private final CeramicWareRepository ceramicWareRepository;

    @Autowired
    public CeramicWareService(CeramicWareRepository ceramicWareRepository) {
        this.ceramicWareRepository = ceramicWareRepository;
    }

    public List<CeramicWare> findAll() {
        return ceramicWareRepository.findAll();
    }

    public CeramicWare findById(String id) {
        return ceramicWareRepository.findById(id);
    }
}
