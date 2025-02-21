package com.studio1way.studio1way.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/_status")
public class StatusController {

    @GetMapping
    public String getStatus() {
        return "🥞";
    }
}
