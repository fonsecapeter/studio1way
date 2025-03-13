package com.studio1way.studio1way.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(
    value = { "/other/**", "/ceramics/**", "/paint/**", "/wood/**", "/the-studio/**" }
)
public class SPAPathsController {

    @GetMapping
    public String forwardSPAPaths() {
        return "forward:/";
    }
}
