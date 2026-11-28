package com.studio1way.projectadmin.input;

import com.studio1way.studio1way.model.project.fields.ProjectVideo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProjectVideoInput(
    @NotBlank String src,
    @NotNull ProjectVideo.AspectRatio aspectRatio
) {}
