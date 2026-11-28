package com.studio1way.projectadmin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studio1way.projectadmin.create.DerivativeGenerator;
import com.studio1way.projectadmin.create.ExperimentalProjectCreator;
import com.studio1way.projectadmin.input.CreateExperimentalProjectInput;
import com.studio1way.studio1way.model.project.ExperimentalProject;
import graphql.GraphqlErrorException;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

public final class CreateExperimentalProjectFetcher
    implements DataFetcher<ExperimentalProject> {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final ExperimentalProjectCreator creator;

    public CreateExperimentalProjectFetcher(DerivativeGenerator derivatives) {
        this.creator = new ExperimentalProjectCreator(derivatives);
    }

    @Override
    public ExperimentalProject get(DataFetchingEnvironment environment) {
        CreateExperimentalProjectInput input;
        try {
            input =
                OBJECT_MAPPER.convertValue(
                    environment.getArgument("input"),
                    CreateExperimentalProjectInput.class
                );
        } catch (IllegalArgumentException e) {
            throw GraphqlErrorException
                .newErrorException()
                .message("Invalid create input: " + e.getMessage())
                .build();
        }
        return creator.create(input);
    }
}
