package com.studio1way.studio1way.model.project.resources;

import static org.junit.jupiter.api.Assertions.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.studio1way.studio1way.AppRoot;
import com.studio1way.studio1way.model.project.CeramicWare;
import com.studio1way.studio1way.model.project.ExperimentalProject;
import com.studio1way.studio1way.model.project.Painting;
import com.studio1way.studio1way.model.project.Project;
import com.studio1way.studio1way.model.project.WoodWork;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

public class ProjectResourceRoundTripTest {

    private final ObjectMapper objectMapper = loaderMapper();
    private final ProjectResourceWriter writer = new ProjectResourceWriter();

    @TempDir
    private Path tempDir;

    private static ObjectMapper loaderMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
        return objectMapper;
    }

    @Test
    public void testWoodWorksRoundTrip() throws IOException {
        roundTripCategory("woodworks", WoodWork.class);
    }

    @Test
    public void testCeramicWaresRoundTrip() throws IOException {
        roundTripCategory("ceramicwares", CeramicWare.class);
    }

    @Test
    public void testPaintingsRoundTrip() throws IOException {
        roundTripCategory("paintings", Painting.class);
    }

    @Test
    public void testExperimentalProjectsRoundTrip() throws IOException {
        roundTripCategory("experiments", ExperimentalProject.class);
    }

    private <T extends Project> void roundTripCategory(String category, Class<T> type)
        throws IOException {
        Path directory = Path.of(AppRoot.PATH, "src/main/resources/projects", category);
        List<Path> files;
        try (Stream<Path> stream = Files.list(directory)) {
            files =
                stream
                    .filter(path -> path.toString().endsWith(".json"))
                    .sorted()
                    .toList();
        }
        assertFalse(files.isEmpty(), category);
        for (Path file : files) {
            String source = Files.readString(file);
            T project = objectMapper.readValue(source, type);
            ObjectNode written = project.toResourceJson();
            assertSameDocument(objectMapper.readTree(source), written, file.toString());
            Path out = tempDir.resolve(category).resolve(file.getFileName());
            assertEquals(
                ProjectResourceWriter.Result.CREATED,
                writer.write(out.toFile(), written)
            );
            T reloaded = objectMapper.readValue(out.toFile(), type);
            assertEquals(project, reloaded, file.toString());
            assertEquals(
                ProjectResourceWriter.Result.UNCHANGED,
                writer.write(out.toFile(), written)
            );
        }
    }

    private void assertSameDocument(JsonNode expected, JsonNode actual, String context) {
        if (expected.isObject()) {
            assertTrue(actual.isObject(), context);
            Iterator<String> expectedFields = expected.fieldNames();
            while (expectedFields.hasNext()) {
                String field = expectedFields.next();
                assertTrue(
                    actual.has(field),
                    String.format("%s: missing field %s", context, field)
                );
                assertSameDocument(
                    expected.get(field),
                    actual.get(field),
                    String.format("%s.%s", context, field)
                );
            }
            Iterator<String> actualFields = actual.fieldNames();
            while (actualFields.hasNext()) {
                String field = actualFields.next();
                assertTrue(
                    expected.has(field),
                    String.format("%s: unexpected field %s", context, field)
                );
            }
        } else if (expected.isArray()) {
            assertTrue(actual.isArray(), context);
            assertEquals(expected.size(), actual.size(), context);
            for (int i = 0; i < expected.size(); i++) {
                assertSameDocument(
                    expected.get(i),
                    actual.get(i),
                    String.format("%s[%d]", context, i)
                );
            }
        } else if (expected.isNumber()) {
            assertTrue(actual.isNumber(), context);
            assertEquals(expected.doubleValue(), actual.doubleValue(), 0.0, context);
        } else {
            assertEquals(expected, actual, context);
        }
    }
}
