package com.studio1way.studio1way.controller;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/coding-philosophy.md")
public class CodingPhilosophyController {

    @GetMapping
    public ResponseEntity<String> getCodingPhilosophy() throws IOException {
        String philosophy = new ClassPathResource("coding-philosophy.md")
            .getContentAsString(StandardCharsets.UTF_8);
        return ResponseEntity
            .ok()
            .contentType(MediaType.parseMediaType("text/markdown"))
            .body(philosophy);
    }
}
