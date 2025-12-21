package com.studio1way.studio1way.config;

import com.studio1way.studio1way.model.project.CeramicWare;
import com.studio1way.studio1way.model.project.Painting;
import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.WoodWork;
import graphql.schema.TypeResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

@Configuration
public class GraphQLConfig {

    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return builder ->
            builder.type(
                "Project",
                typeWiring -> typeWiring.typeResolver(typeResolver())
            );
    }

    private TypeResolver typeResolver() {
        return env -> {
            if (env.getObject() instanceof CeramicWare) {
                return env.getSchema().getObjectType("CeramicWare");
            }
            if (env.getObject() instanceof WoodWork) {
                return env.getSchema().getObjectType("WoodWork");
            }
            if (env.getObject() instanceof Painting) {
                return env.getSchema().getObjectType("Painting");
            }
            if (env.getObject() instanceof Project) {
                return env.getSchema().getObjectType("OtherProject");
            }
            throw new RuntimeException(
                String.format(
                    "Unresolved GraphQL type: %s",
                    env.getObject().getClass().getSimpleName()
                )
            );
        };
    }
}
