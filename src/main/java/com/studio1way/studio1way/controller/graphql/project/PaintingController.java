package com.studio1way.studio1way.controller.graphql.project;

import com.studio1way.studio1way.model.project.Painting;
import com.studio1way.studio1way.service.PaintingService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class PaintingController {

    private final PaintingService paintingService;

    @Autowired
    public PaintingController(PaintingService paintingService) {
        this.paintingService = paintingService;
    }

    @QueryMapping
    public Painting painting(@Argument String id) {
        return paintingService.findById(id);
    }
}
