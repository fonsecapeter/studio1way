package com.studio1way.projectadmin.input;

import com.studio1way.studio1way.model.project.WoodWork;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.util.List;

public record CreateWoodWorkInput(
    String id,
    @NotBlank String name,
    @NotBlank @Pattern(regexp = "\\d{4}(-\\d{2}(-\\d{2})?)?") String date,
    @NotBlank String description,
    @NotBlank String materials,
    @NotNull WoodWork.Finish finish,
    @NotNull @Valid Project3DimensionInput dimensions,
    List<@Valid ProjectLinkInput> links,
    @NotEmpty List<@Valid ProjectImageInput> images
) {}
