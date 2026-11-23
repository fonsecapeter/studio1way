package com.studio1way.projectadmin.input;

import jakarta.validation.constraints.NotBlank;

public record ProjectLinkInput(@NotBlank String url, @NotBlank String text) {}
