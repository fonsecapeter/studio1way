package com.studio1way.studio1way.repository.project.resources;

import com.fasterxml.jackson.core.util.DefaultIndenter;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.core.util.Separators;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.File;
import java.io.IOException;
import java.nio.file.AtomicMoveNotSupportedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class ProjectResourceWriter {

    public enum Result {
        CREATED,
        UNCHANGED,
    }

    private final ObjectMapper objectMapper = new ObjectMapper();

    public Result write(File target, ObjectNode json) throws IOException {
        String content =
            objectMapper.writer(prettyPrinter()).writeValueAsString(json) + "\n";
        Path targetPath = target.toPath();
        if (Files.exists(targetPath)) {
            if (Files.readString(targetPath).equals(content)) {
                return Result.UNCHANGED;
            }
            throw new IllegalStateException(
                String.format(
                    "Refusing to overwrite %s: existing content differs",
                    targetPath
                )
            );
        }
        Path directory = targetPath.toAbsolutePath().getParent();
        Files.createDirectories(directory);
        Path tempFile = Files.createTempFile(
            directory,
            targetPath.getFileName().toString(),
            ".tmp"
        );
        try {
            Files.writeString(tempFile, content);
            try {
                Files.move(tempFile, targetPath, StandardCopyOption.ATOMIC_MOVE);
            } catch (AtomicMoveNotSupportedException err) {
                Files.move(tempFile, targetPath);
            }
        } finally {
            Files.deleteIfExists(tempFile);
        }
        return Result.CREATED;
    }

    private DefaultPrettyPrinter prettyPrinter() {
        DefaultPrettyPrinter printer = new DefaultPrettyPrinter();
        DefaultIndenter indenter = new DefaultIndenter("  ", "\n");
        printer.indentObjectsWith(indenter);
        printer.indentArraysWith(indenter);
        return printer.withSeparators(
            Separators
                .createDefaultInstance()
                .withObjectFieldValueSpacing(Separators.Spacing.AFTER)
                .withObjectEmptySeparator("")
                .withArrayEmptySeparator("")
        );
    }
}
