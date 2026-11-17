package com.studio1way.projectadmin;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.graphql.ExecutionGraphQlService;
import org.springframework.graphql.execution.DefaultExecutionGraphQlService;
import org.springframework.graphql.execution.GraphQlSource;

public final class AuthoringSchema {

    private AuthoringSchema() {}

    public static GraphQlSource graphQlSource() {
        quietSchemaBuilderLogging();
        return GraphQlSource
            .schemaResourceBuilder()
            .schemaResources(
                new ClassPathResource("graphql/schema.graphqls"),
                new ClassPathResource("graphql-authoring/authoring.graphqls")
            )
            .build();
    }

    public static ExecutionGraphQlService executionService() {
        return new DefaultExecutionGraphQlService(graphQlSource());
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
