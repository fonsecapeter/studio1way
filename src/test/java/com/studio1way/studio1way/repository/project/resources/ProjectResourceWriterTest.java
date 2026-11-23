package com.studio1way.studio1way.repository.project.resources;

import static org.junit.jupiter.api.Assertions.*;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

public class ProjectResourceWriterTest {

    private final ProjectResourceWriter writer = new ProjectResourceWriter();

    @TempDir
    private Path tempDir;

    private ObjectNode sampleJson(String name) {
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        node.put("id", "test-project");
        node.put("name", name);
        return node;
    }

    @Test
    public void testCreatesANewFile() throws IOException {
        Path target = tempDir.resolve("nested/test_project.json");
        ProjectResourceWriter.Result result = writer.write(
            target.toFile(),
            sampleJson("Test Project")
        );
        assertEquals(ProjectResourceWriter.Result.CREATED, result);
        String content = Files.readString(target);
        assertTrue(content.contains("\"id\": \"test-project\""));
        assertTrue(content.endsWith("}\n"));
    }

    @Test
    public void testIdenticalContentIsANoOp() throws IOException {
        Path target = tempDir.resolve("test_project.json");
        writer.write(target.toFile(), sampleJson("Test Project"));
        String content = Files.readString(target);
        ProjectResourceWriter.Result result = writer.write(
            target.toFile(),
            sampleJson("Test Project")
        );
        assertEquals(ProjectResourceWriter.Result.UNCHANGED, result);
        assertEquals(content, Files.readString(target));
    }

    @Test
    public void testDifferentContentConflicts() throws IOException {
        Path target = tempDir.resolve("test_project.json");
        writer.write(target.toFile(), sampleJson("Test Project"));
        String content = Files.readString(target);
        assertThrows(
            IllegalStateException.class,
            () -> writer.write(target.toFile(), sampleJson("Another Project"))
        );
        assertEquals(content, Files.readString(target));
    }

    @Test
    public void testFailedWriteLeavesNoPartialFile() throws IOException {
        Path blocker = tempDir.resolve("blocker");
        Files.writeString(blocker, "not a directory");
        Path target = blocker.resolve("test_project.json");
        assertThrows(
            IOException.class,
            () -> writer.write(target.toFile(), sampleJson("Test Project"))
        );
        assertFalse(Files.exists(target));
        try (Stream<Path> stream = Files.list(tempDir)) {
            assertEquals(1, stream.count(), "only the blocker file should remain");
        }
    }
}
