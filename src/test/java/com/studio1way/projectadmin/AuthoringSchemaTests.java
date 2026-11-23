package com.studio1way.projectadmin;

import static org.assertj.core.api.Assertions.assertThat;

import graphql.ExecutionResult;
import java.util.Locale;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.graphql.ExecutionGraphQlRequest;
import org.springframework.graphql.ExecutionGraphQlService;
import org.springframework.graphql.support.DefaultExecutionGraphQlRequest;

public class AuthoringSchemaTests {

    private final ExecutionGraphQlService service = AuthoringSchema.executionService();

    private ExecutionResult execute(String document) {
        ExecutionGraphQlRequest request = new DefaultExecutionGraphQlRequest(
            document,
            null,
            Map.of(),
            Map.of(),
            "test",
            Locale.ENGLISH
        );
        return service.execute(request).block().getExecutionResult();
    }

    @Test
    public void authoringSchemaHasACreateWoodWorkMutationWithTheFinishEnum() {
        assertThat(
            AuthoringSchema
                .graphQlSource()
                .schema()
                .getMutationType()
                .getFieldDefinition("createWoodWork")
        )
            .isNotNull();
        assertThat(AuthoringSchema.graphQlSource().schema().getType("WoodWorkFinish"))
            .isNotNull();
    }

    @Test
    public void authoringSchemaHasAMutationTypeWithCreateExperimentalProject() {
        assertThat(AuthoringSchema.graphQlSource().schema().getMutationType())
            .isNotNull();
        assertThat(
            AuthoringSchema
                .graphQlSource()
                .schema()
                .getMutationType()
                .getFieldDefinition("createExperimentalProject")
        )
            .isNotNull();
    }

    @Test
    public void aValidCreateOperationExecutesWithoutErrors() {
        ExecutionResult result = execute(
            """
            mutation {
                createExperimentalProject(input: {
                    name: "Test Project"
                    date: "2026-01"
                    description: "A test project."
                    variety: "installation"
                    video: { src: "https://example.com/embed", aspectRatio: WIDE }
                    links: [{ url: "https://example.com", text: "Example" }]
                    images: [{
                        sourcePath: "/tmp/main.jpg"
                        name: "main"
                        alt: "main view"
                        icon: true
                    }]
                }) { id }
            }
            """
        );

        assertThat(result.getErrors()).isEmpty();
    }

    @Test
    public void anUnknownInputFieldIsRejected() {
        ExecutionResult result = execute(
            """
            mutation {
                createExperimentalProject(input: {
                    name: "Test Project"
                    date: "2026-01"
                    description: "A test project."
                    variety: "installation"
                    images: [{ sourcePath: "/tmp/main.jpg", name: "main", alt: "main view" }]
                    bogus: true
                }) { id }
            }
            """
        );

        assertThat(result.getErrors()).isNotEmpty();
    }

    @Test
    public void aMissingRequiredInputFieldIsRejected() {
        ExecutionResult result = execute(
            """
            mutation {
                createExperimentalProject(input: {
                    date: "2026-01"
                    description: "A test project."
                    variety: "installation"
                    images: [{ sourcePath: "/tmp/main.jpg", name: "main", alt: "main view" }]
                }) { id }
            }
            """
        );

        assertThat(result.getErrors()).isNotEmpty();
    }

    @Test
    public void aWronglyCasedEnumValueIsRejected() {
        ExecutionResult result = execute(
            """
            mutation {
                createExperimentalProject(input: {
                    name: "Test Project"
                    date: "2026-01"
                    description: "A test project."
                    variety: "installation"
                    video: { src: "https://example.com/embed", aspectRatio: wide }
                    images: [{ sourcePath: "/tmp/main.jpg", name: "main", alt: "main view" }]
                }) { id }
            }
            """
        );

        assertThat(result.getErrors()).isNotEmpty();
    }
}
