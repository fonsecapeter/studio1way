package com.studio1way.projectadmin.input;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import java.util.List;

public record CreateExperimentalProjectInput(
    String id,
    @NotBlank String name,
    @NotBlank @Pattern(regexp = "\\d{4}(-\\d{2}(-\\d{2})?)?") String date,
    @NotBlank String description,
    @NotBlank String variety,
    @Valid ProjectVideoInput video,
    List<@Valid ProjectLinkInput> links,
    @NotEmpty List<@Valid ProjectImageInput> images
) {}
