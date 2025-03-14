package com.studio1way.studio1way.controller.graphql.project;

import com.studio1way.studio1way.model.project.CeramicWare;
import com.studio1way.studio1way.service.CeramicWareService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class CeramicWareController {

    private final CeramicWareService ceramicWareService;

    @Autowired
    public CeramicWareController(CeramicWareService ceramicWareService) {
        this.ceramicWareService = ceramicWareService;
    }

    @QueryMapping
    public List<CeramicWare> ceramicWares() {
        return ceramicWareService.findAll();
    }

    @QueryMapping
    public CeramicWare ceramicWare(@Argument String id) {
        return ceramicWareService.findById(id);
    }
}
