package com.studio1way.studio1way.controller.graphql.project;

import com.studio1way.studio1way.model.project.WoodWork;
import com.studio1way.studio1way.service.WoodWorkService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class WoodWorkController {

    private final WoodWorkService woodWorkService;

    @Autowired
    public WoodWorkController(WoodWorkService woodWorkService) {
        this.woodWorkService = woodWorkService;
    }

    @QueryMapping
    public WoodWork woodWork(@Argument String id) {
        return woodWorkService.findById(id);
    }
}
