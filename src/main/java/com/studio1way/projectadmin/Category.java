package com.studio1way.projectadmin;

import java.util.Optional;

public enum Category {
    EXPERIMENT(
        "experiment",
        "experiments",
        "createExperimentalProject",
        "CreateExperimentalProjectInput",
        true,
        "/experimental",
        "bin/add-project create experiment --name \"Hotel Hallway\" --date 2024-11" +
        " --description \"A hallway run like a hotel.\" --variety installation" +
        " --image-source-path ~/Downloads/hallway.jpg --image-name hallway" +
        " --image-alt \"the hallway\" --image-icon true"
    ),
    WOODWORK(
        "woodwork",
        "woodworks",
        "createWoodWork",
        "CreateWoodWorkInput",
        true,
        "/wood",
        "bin/add-project create woodwork --name \"Step Stool\" --date 2026-11-22" +
        " --description \"A stool for reaching the top shelf.\" --materials oak" +
        " --finish TUNG_OIL --dimensions-height 18 --dimensions-width 14" +
        " --dimensions-depth 10 --image-source-path ~/Downloads/stool.jpg" +
        " --image-name stool --image-alt \"oak step stool\" --image-icon true"
    );

    private final String cliName;
    private final String resourceDirectory;
    private final String mutationName;
    private final String inputTypeName;
    private final boolean createSupported;
    private final String routePrefix;
    private final String exampleCommand;

    Category(
        String cliName,
        String resourceDirectory,
        String mutationName,
        String inputTypeName,
        boolean createSupported,
        String routePrefix,
        String exampleCommand
    ) {
        this.cliName = cliName;
        this.resourceDirectory = resourceDirectory;
        this.mutationName = mutationName;
        this.inputTypeName = inputTypeName;
        this.createSupported = createSupported;
        this.routePrefix = routePrefix;
        this.exampleCommand = exampleCommand;
    }

    public static Optional<Category> fromCliName(String cliName) {
        for (Category category : values()) {
            if (category.cliName.equals(cliName)) {
                return Optional.of(category);
            }
        }
        return Optional.empty();
    }

    public String mutationDocument() {
        return (
            "mutation Create($input: " +
            inputTypeName +
            "!) { " +
            mutationName +
            "(input: $input) { id name } }"
        );
    }

    public String detailRoute(String projectId) {
        return routePrefix + "/project/" + projectId;
    }

    public String cliName() {
        return cliName;
    }

    public String resourceDirectory() {
        return resourceDirectory;
    }

    public String mutationName() {
        return mutationName;
    }

    public String inputTypeName() {
        return inputTypeName;
    }

    public boolean createSupported() {
        return createSupported;
    }

    public String routePrefix() {
        return routePrefix;
    }

    public String exampleCommand() {
        return exampleCommand;
    }
}
