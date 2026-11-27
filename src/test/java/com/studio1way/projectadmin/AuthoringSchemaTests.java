package com.studio1way.projectadmin;

import static org.assertj.core.api.Assertions.assertThat;

import com.studio1way.projectadmin.create.DerivativeGenerator;
import com.studio1way.projectadmin.create.PreviewPages;
import com.studio1way.studio1way.AppRoot;
import graphql.ExecutionResult;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Stream;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.graphql.ExecutionGraphQlRequest;
import org.springframework.graphql.ExecutionGraphQlService;
import org.springframework.graphql.support.DefaultExecutionGraphQlRequest;

public class AuthoringSchemaTests {

    private final ExecutionGraphQlService service = AuthoringSchema.executionService();
    private final ExecutionGraphQlService fakeService = AuthoringSchema.executionService(
        fakeDerivatives()
    );
    private final Path resourceFile = Path.of(
        AppRoot.PATH,
        "src/main/resources/projects/experiments/test_project.json"
    );
    private final Path assetsDir = Path.of(
        AppRoot.PATH,
        "frontend/src/assets/img/projects/experiments/test_project"
    );
    private String originalPreview;

    @BeforeEach
    public void snapshotPreview() throws IOException {
        originalPreview = PreviewPages.read();
    }

    @AfterEach
    public void cleanUp() throws IOException {
        Files.deleteIfExists(resourceFile);
        deleteRecursively(assetsDir);
        PreviewPages.restore(originalPreview);
    }

    private ExecutionResult execute(String document) {
        return execute(service, document);
    }

    private ExecutionResult execute(
        ExecutionGraphQlService executionService,
        String document
    ) {
        ExecutionGraphQlRequest request = new DefaultExecutionGraphQlRequest(
            document,
            null,
            Map.of(),
            Map.of(),
            "test",
            Locale.ENGLISH
        );
        return executionService.execute(request).block().getExecutionResult();
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
            fakeService,
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
                        sourcePath: "%s"
                        name: "main"
                        alt: "main view"
                        icon: true
                    }]
                }) { id }
            }
            """.formatted(
                    AppRoot.PATH +
                    "/frontend/src/assets/img/projects/woodworks/poplar_shelf/in_situ/100.jpg"
                )
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

    private static DerivativeGenerator fakeDerivatives() {
        return imageDir -> {
            String extension;
            try (Stream<Path> files = Files.list(imageDir)) {
                extension =
                    files
                        .map(path -> path.getFileName().toString())
                        .filter(name -> name.startsWith("100."))
                        .findFirst()
                        .orElseThrow()
                        .substring(4);
            }
            byte[] content = Files.readAllBytes(imageDir.resolve("100." + extension));
            for (String tier : List.of("50", "25")) {
                Files.write(imageDir.resolve(tier + "." + extension), content);
            }
            for (String format : List.of("webp", "avif")) {
                for (String tier : List.of("100", "50", "25")) {
                    Files.write(imageDir.resolve(tier + "." + format), content);
                }
            }
        };
    }

    private static void deleteRecursively(Path dir) throws IOException {
        if (!Files.exists(dir)) {
            return;
        }
        try (Stream<Path> walk = Files.walk(dir)) {
            for (Path path : walk.sorted(Comparator.reverseOrder()).toList()) {
                Files.deleteIfExists(path);
            }
        }
    }
}
