package com.studio1way.projectadmin.create;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.studio1way.projectadmin.AuthoringSchema;
import com.studio1way.projectadmin.Category;
import com.studio1way.studio1way.AppRoot;
import graphql.ExecutionResult;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.LinkedHashMap;
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

public class ExperimentalProjectCreatorTests {

    private static final String ID = "test-created-experiment";
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final Path resourceFile = Path.of(
        AppRoot.PATH,
        "src/main/resources/projects/experiments/test_created_experiment.json"
    );
    private final Path assetsDir = Path.of(
        AppRoot.PATH,
        "frontend/src/assets/img/projects/experiments/test_created_experiment"
    );
    private final Path sourceOne = Path.of(
        AppRoot.PATH,
        "frontend/src/assets/img/projects/woodworks/poplar_shelf/in_situ/100.jpg"
    );
    private final Path sourceTwo = Path.of(
        AppRoot.PATH,
        "frontend/src/assets/img/projects/woodworks/poplar_shelf/corner/100.jpg"
    );

    private final ExecutionGraphQlService service = AuthoringSchema.executionService(
        fakeDerivatives()
    );
    private String originalPreview;

    @BeforeEach
    public void snapshotPreview() throws IOException {
        originalPreview = PreviewPages.read();
        assertThat(resourceFile).doesNotExist();
        assertThat(assetsDir).doesNotExist();
    }

    @AfterEach
    public void cleanUp() throws IOException {
        Files.deleteIfExists(resourceFile);
        deleteRecursively(assetsDir);
        PreviewPages.restore(originalPreview);
    }

    @Test
    public void testValidCreateWritesProjectImagesVideoAndPreviewRoutes()
        throws IOException {
        ExecutionResult result = execute(service, validInput());

        assertThat(result.getErrors()).isEmpty();
        Map<String, Object> created = createdProject(result);
        assertThat(created.get("id")).isEqualTo(ID);
        assertThat(created.get("name")).isEqualTo("Test Created Experiment");

        JsonNode json = OBJECT_MAPPER.readTree(resourceFile.toFile());
        assertThat(json.get("variety").asText()).isEqualTo("installation");
        assertThat(json.get("video").get("src").asText())
            .isEqualTo("https://example.com/embed/test");
        assertThat(json.get("video").get("aspectRatio").asText()).isEqualTo("FULL");
        assertThat(json.get("images").size()).isEqualTo(2);
        assertThat(json.get("icon").get("path").asText()).endsWith("/main");

        for (String image : List.of("main", "detail")) {
            for (String file : List.of(
                "100.jpg",
                "50.jpg",
                "25.jpg",
                "100.webp",
                "100.avif"
            )) {
                assertThat(assetsDir.resolve(image).resolve(file)).exists();
            }
        }
        assertThat(PreviewPages.read())
            .contains("/experimental/project/" + ID)
            .contains("/experimental");
    }

    @Test
    public void testValidCreateWithoutVideoWritesNoVideoField() throws IOException {
        Map<String, Object> input = validInput();
        input.remove("video");

        ExecutionResult result = execute(service, input);

        assertThat(result.getErrors()).isEmpty();
        JsonNode json = OBJECT_MAPPER.readTree(resourceFile.toFile());
        assertThat(json.has("video")).isFalse();
    }

    @Test
    public void testUnknownInputFieldIsRejectedAndWritesNothing() {
        Map<String, Object> input = validInput();
        input.put("bogus", "value");

        ExecutionResult result = execute(service, input);

        assertThat(result.getErrors()).isNotEmpty();
        assertNothingWritten();
    }

    @Test
    public void testMissingRequiredFieldIsRejectedAndWritesNothing() {
        Map<String, Object> input = validInput();
        input.remove("variety");

        ExecutionResult result = execute(service, input);

        assertThat(result.getErrors()).isNotEmpty();
        assertNothingWritten();
    }

    @Test
    public void testWrongCaseAspectRatioIsRejectedAndWritesNothing() {
        Map<String, Object> input = validInput();
        video(input).put("aspectRatio", "wide");

        ExecutionResult result = execute(service, input);

        assertThat(result.getErrors()).isNotEmpty();
        assertNothingWritten();
    }

    @Test
    public void testUnknownAspectRatioIsRejectedAndWritesNothing() {
        Map<String, Object> input = validInput();
        video(input).put("aspectRatio", "SQUARE");

        ExecutionResult result = execute(service, input);

        assertThat(result.getErrors()).isNotEmpty();
        assertNothingWritten();
    }

    @Test
    public void testBlankDescriptionFailsValidationAndWritesNothing() {
        Map<String, Object> input = validInput();
        input.put("description", " ");

        ExecutionResult result = execute(service, input);

        assertThat(result.getErrors()).isNotEmpty();
        assertNothingWritten();
    }

    @Test
    public void testBlankImageAltFailsValidationAndWritesNothing() {
        Map<String, Object> input = validInput();
        image(input, 0).put("alt", " ");

        ExecutionResult result = execute(service, input);

        assertThat(result.getErrors()).isNotEmpty();
        assertNothingWritten();
    }

    @Test
    public void testDuplicateImageNamesAreRejectedAndWriteNothing() {
        Map<String, Object> input = validInput();
        image(input, 1).put("name", "main");

        ExecutionResult result = execute(service, input);

        assertThat(result.getErrors()).isNotEmpty();
        assertNothingWritten();
    }

    @Test
    public void testIdenticalRecreateIsANoOp() throws IOException {
        assertThat(execute(service, validInput()).getErrors()).isEmpty();
        String written = Files.readString(resourceFile);

        ExecutionResult second = execute(service, validInput());

        assertThat(second.getErrors()).isEmpty();
        assertThat(createdProject(second).get("id")).isEqualTo(ID);
        assertThat(Files.readString(resourceFile)).isEqualTo(written);
    }

    @Test
    public void testConflictingRecreateKeepsTheOriginal() throws IOException {
        assertThat(execute(service, validInput()).getErrors()).isEmpty();
        String written = Files.readString(resourceFile);
        Map<String, Object> changed = validInput();
        changed.put("description", "A different description.");

        ExecutionResult result = execute(service, changed);

        assertThat(result.getErrors()).isNotEmpty();
        assertThat(Files.readString(resourceFile)).isEqualTo(written);
    }

    @Test
    public void testMissingImageSourceIsRejectedAndWritesNothing() {
        Map<String, Object> input = validInput();
        image(input, 0).put("sourcePath", "/nonexistent/photo.jpg");

        ExecutionResult result = execute(service, input);

        assertThat(result.getErrors()).isNotEmpty();
        assertNothingWritten();
    }

    @Test
    public void testDerivativeFailureRollsBackEverything() {
        ExecutionGraphQlService failing = AuthoringSchema.executionService(imageDir -> {
            throw new IOException("boom");
        });

        ExecutionResult result = execute(failing, validInput());

        assertThat(result.getErrors()).isNotEmpty();
        assertNothingWritten();
    }

    private void assertNothingWritten() {
        assertThat(resourceFile).doesNotExist();
        assertThat(assetsDir).doesNotExist();
        try {
            assertThat(PreviewPages.read()).isEqualTo(originalPreview);
        } catch (IOException e) {
            throw new AssertionError(e);
        }
    }

    private Map<String, Object> validInput() {
        Map<String, Object> input = new LinkedHashMap<>();
        input.put("name", "Test Created Experiment");
        input.put("date", "2026-11-22");
        input.put("description", "A test experiment created by the test battery.");
        input.put("variety", "installation");
        Map<String, Object> video = new LinkedHashMap<>();
        video.put("src", "https://example.com/embed/test");
        video.put("aspectRatio", "FULL");
        input.put("video", video);
        Map<String, Object> main = new LinkedHashMap<>();
        main.put("sourcePath", sourceOne.toString());
        main.put("name", "main");
        main.put("alt", "the test experiment in place");
        main.put("icon", true);
        Map<String, Object> detail = new LinkedHashMap<>();
        detail.put("sourcePath", sourceTwo.toString());
        detail.put("name", "detail");
        detail.put("alt", "the test experiment corner");
        input.put("images", List.of(main, detail));
        return input;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> image(Map<String, Object> input, int index) {
        return ((List<Map<String, Object>>) input.get("images")).get(index);
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> video(Map<String, Object> input) {
        return (Map<String, Object>) input.get("video");
    }

    private ExecutionResult execute(
        ExecutionGraphQlService executionService,
        Map<String, Object> input
    ) {
        ExecutionGraphQlRequest request = new DefaultExecutionGraphQlRequest(
            Category.EXPERIMENT.mutationDocument(),
            null,
            Map.of("input", input),
            Map.of(),
            "test",
            Locale.ENGLISH
        );
        return executionService.execute(request).block().getExecutionResult();
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> createdProject(ExecutionResult result) {
        Map<String, Object> data = result.getData();
        return (Map<String, Object>) data.get("createExperimentalProject");
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
