package com.studio1way.projectadmin;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import com.studio1way.projectadmin.create.DerivativeGenerator;
import com.studio1way.projectadmin.create.ScriptDerivativeGenerator;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.graphql.ExecutionGraphQlService;
import org.springframework.graphql.execution.DefaultExecutionGraphQlService;
import org.springframework.graphql.execution.GraphQlSource;

public final class AuthoringSchema {

    private AuthoringSchema() {}

    public static GraphQlSource graphQlSource() {
        return graphQlSource(new ScriptDerivativeGenerator());
    }

    public static GraphQlSource graphQlSource(DerivativeGenerator derivatives) {
        quietSchemaBuilderLogging();
        return GraphQlSource
            .schemaResourceBuilder()
            .schemaResources(
                new ClassPathResource("graphql/schema.graphqls"),
                new ClassPathResource("graphql-authoring/authoring.graphqls")
            )
            .configureRuntimeWiring(wiring ->
                wiring.type(
                    "Mutation",
                    builder ->
                        builder
                            .dataFetcher(
                                "createWoodWork",
                                new CreateWoodWorkFetcher(derivatives)
                            )
                            .dataFetcher(
                                "createExperimentalProject",
                                new CreateExperimentalProjectFetcher(derivatives)
                            )
                )
            )
            .build();
    }

    public static ExecutionGraphQlService executionService() {
        return new DefaultExecutionGraphQlService(graphQlSource());
    }

    public static ExecutionGraphQlService executionService(
        DerivativeGenerator derivatives
    ) {
        return new DefaultExecutionGraphQlService(graphQlSource(derivatives));
    }

    private static void quietSchemaBuilderLogging() {
        if (
            LoggerFactory.getLogger(
                "org.springframework.graphql"
            ) instanceof Logger logbackLogger
        ) {
            logbackLogger.setLevel(Level.WARN);
        }
    }
}
