package com.studio1way.studio1way.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(
    // Update changes in frontend/src/routes.tsx
    value = { "/other/**", "/ceramics/**", "/paint/**", "/wood/**", "/the-studio/**", "/portfolio/**" }
)
public class SPAPathsController {

    @GetMapping
    public String forwardSPAPaths() {
        return "forward:/";
    }
}
