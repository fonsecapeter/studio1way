package com.studio1way.projectadmin.input;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record Project3DimensionInput(
    @NotNull @Positive Float height,
    @NotNull @Positive Float width,
    @NotNull @Positive Float depth
) {}
