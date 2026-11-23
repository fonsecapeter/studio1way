package com.studio1way.projectadmin.input;

import jakarta.validation.constraints.NotBlank;

public record ProjectImageInput(
    @NotBlank String sourcePath,
    @NotBlank String name,
    @NotBlank String alt,
    Boolean icon
) {}
