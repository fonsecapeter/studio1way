package com.studio1way.projectadmin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studio1way.projectadmin.create.DerivativeGenerator;
import com.studio1way.projectadmin.create.WoodWorkCreator;
import com.studio1way.projectadmin.input.CreateWoodWorkInput;
import com.studio1way.studio1way.model.project.WoodWork;
import graphql.GraphqlErrorException;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

public final class CreateWoodWorkFetcher implements DataFetcher<WoodWork> {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final WoodWorkCreator creator;

    public CreateWoodWorkFetcher(DerivativeGenerator derivatives) {
        this.creator = new WoodWorkCreator(derivatives);
    }

    @Override
    public WoodWork get(DataFetchingEnvironment environment) {
        CreateWoodWorkInput input;
        try {
            input =
                OBJECT_MAPPER.convertValue(
                    environment.getArgument("input"),
                    CreateWoodWorkInput.class
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
