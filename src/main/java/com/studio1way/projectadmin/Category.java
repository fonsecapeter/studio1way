package com.studio1way.projectadmin;

import java.util.Optional;

public enum Category {
    EXPERIMENT(
        "experiment",
        "experiments",
        "createExperimentalProject",
        "CreateExperimentalProjectInput",
        "bin/add-project create experiment --name \"Hotel Hallway\" --date 2024-11" +
        " --description \"A hallway run like a hotel.\" --variety installation" +
        " --image-source-path ~/Downloads/hallway.jpg --image-name hallway" +
        " --image-alt \"the hallway\" --image-icon true"
    );

    private final String cliName;
    private final String resourceDirectory;
    private final String mutationName;
    private final String inputTypeName;
    private final String exampleCommand;

    Category(
        String cliName,
        String resourceDirectory,
        String mutationName,
        String inputTypeName,
        String exampleCommand
    ) {
        this.cliName = cliName;
        this.resourceDirectory = resourceDirectory;
        this.mutationName = mutationName;
        this.inputTypeName = inputTypeName;
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

    public String exampleCommand() {
        return exampleCommand;
    }
}
