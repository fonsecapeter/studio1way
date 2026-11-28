package com.studio1way.projectadmin.create;

import com.studio1way.projectadmin.Category;
import com.studio1way.projectadmin.input.CreateExperimentalProjectInput;
import com.studio1way.projectadmin.input.ProjectImageInput;
import com.studio1way.projectadmin.input.ProjectLinkInput;
import com.studio1way.studio1way.AppRoot;
import com.studio1way.studio1way.model.project.ExperimentalProject;
import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.model.project.fields.ProjectVideo;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceLoader;
import com.studio1way.studio1way.repository.project.resources.ProjectResourceWriter;
import graphql.GraphqlErrorException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Creates one experimental project end to end: Bean Validation, domain
 * checks, image staging through the repo's derivative pipeline, the
 * resource write, a load-back through the production loader, and the
 * preview-pages routes. Any failure after staging starts rolls back
 * everything the run created.
 */
public final class ExperimentalProjectCreator {

    private static final Validator VALIDATOR = Validation
        .buildDefaultValidatorFactory()
        .getValidator();
    private static final Category CATEGORY = Category.EXPERIMENT;

    private final DerivativeGenerator derivatives;
    private final ProjectResourceWriter writer = new ProjectResourceWriter();

    public ExperimentalProjectCreator(DerivativeGenerator derivatives) {
        this.derivatives = derivatives;
    }

    private record CheckedImage(
        Path source,
        String name,
        String alt,
        boolean icon,
        ProjectImage.Extension extension
    ) {}

    public ExperimentalProject create(CreateExperimentalProjectInput input) {
        validateBean(input);
        String id = resolveId(input);
        List<CheckedImage> images = checkImages(input.images());

        Path resourceFile = resourceFile(id);
        Path assetsDir = assetsDir(id);
        if (Files.exists(resourceFile)) {
            return existingProject(input, id, images, resourceFile);
        }
        if (Files.exists(assetsDir)) {
            throw error("Image directory already exists: " + assetsDir);
        }
        return createProject(input, id, images, resourceFile, assetsDir);
    }

    private ExperimentalProject existingProject(
        CreateExperimentalProjectInput input,
        String id,
        List<CheckedImage> images,
        Path resourceFile
    ) {
        ExperimentalProject candidate;
        try {
            candidate = build(input, id, images);
        } catch (IllegalArgumentException e) {
            throw conflict(id);
        }
        ExperimentalProject existing = loadById(id);
        if (
            existing != null &&
            existing.toResourceJson().equals(candidate.toResourceJson())
        ) {
            return candidate;
        }
        throw conflict(id);
    }

    private ExperimentalProject createProject(
        CreateExperimentalProjectInput input,
        String id,
        List<CheckedImage> images,
        Path resourceFile,
        Path assetsDir
    ) {
        List<Path> createdDirs = new ArrayList<>();
        boolean jsonWritten = false;
        boolean previewChanged = false;
        String originalPreview = null;
        try {
            originalPreview = PreviewPages.read();
            for (CheckedImage image : images) {
                Path imageDir = assetsDir.resolve(image.name());
                Files.createDirectories(imageDir);
                createdDirs.add(imageDir);
                Files.copy(
                    image.source(),
                    imageDir.resolve("100." + storedExtension(image.extension()))
                );
                derivatives.generate(imageDir);
            }
            ExperimentalProject project = build(input, id, images);
            ProjectResourceWriter.Result result = writer.write(
                resourceFile.toFile(),
                project.toResourceJson()
            );
            jsonWritten = result == ProjectResourceWriter.Result.CREATED;
            ExperimentalProject loaded = loadById(id);
            if (loaded == null || !loaded.equals(project)) {
                throw new IllegalStateException(
                    "The created project did not load back as written: " + id
                );
            }
            PreviewPages.setRoutes(
                List.of(CATEGORY.detailRoute(id), CATEGORY.routePrefix())
            );
            previewChanged = true;
            return project;
        } catch (IOException | RuntimeException e) {
            rollback(
                createdDirs,
                assetsDir,
                jsonWritten ? resourceFile : null,
                previewChanged,
                originalPreview
            );
            if (e instanceof GraphqlErrorException graphqlError) {
                throw graphqlError;
            }
            throw error(
                "Could not create experimental project " + id + ": " + e.getMessage()
            );
        }
    }

    private void rollback(
        List<Path> createdDirs,
        Path assetsDir,
        Path writtenJson,
        boolean previewChanged,
        String originalPreview
    ) {
        for (Path dir : createdDirs) {
            deleteRecursively(dir);
        }
        try {
            Files.deleteIfExists(assetsDir);
        } catch (IOException ignored) {}
        if (writtenJson != null) {
            try {
                Files.deleteIfExists(writtenJson);
            } catch (IOException ignored) {}
        }
        if (previewChanged) {
            try {
                PreviewPages.restore(originalPreview);
            } catch (IOException ignored) {}
        }
    }

    private static void deleteRecursively(Path dir) {
        if (!Files.exists(dir)) {
            return;
        }
        try (Stream<Path> walk = Files.walk(dir)) {
            walk
                .sorted(Comparator.reverseOrder())
                .forEach(path -> {
                    try {
                        Files.deleteIfExists(path);
                    } catch (IOException ignored) {}
                });
        } catch (IOException ignored) {}
    }

    private ExperimentalProject build(
        CreateExperimentalProjectInput input,
        String id,
        List<CheckedImage> images
    ) {
        String imagePathPrefix =
            CATEGORY.resourceDirectory() + "/" + id.replace('-', '_') + "/";
        ProjectImage[] projectImages = images
            .stream()
            .map(image ->
                new ProjectImage(
                    imagePathPrefix + image.name(),
                    image.extension(),
                    image.alt()
                )
            )
            .toArray(ProjectImage[]::new);
        ProjectImage icon = projectImages[0];
        for (int i = 0; i < images.size(); i++) {
            if (images.get(i).icon()) {
                icon = projectImages[i];
            }
        }
        ProjectLink[] links = input.links() == null
            ? new ProjectLink[] {}
            : input
                .links()
                .stream()
                .map(link -> new ProjectLink(link.url(), link.text()))
                .toArray(ProjectLink[]::new);
        ProjectVideo video = input.video() == null
            ? null
            : new ProjectVideo(input.video().src(), input.video().aspectRatio());
        return new ExperimentalProject(
            id,
            input.name(),
            icon,
            links,
            input.date(),
            input.description(),
            projectImages,
            input.variety(),
            video
        );
    }

    private ExperimentalProject loadById(String id) {
        return new ProjectResourceLoader<ExperimentalProject>()
            .allProjects(
                ExperimentalProject.class,
                AppRoot.PATH +
                "/src/main/resources/projects/" +
                CATEGORY.resourceDirectory() +
                "/"
            )
            .values()
            .stream()
            .filter(project -> project.getId().equals(id))
            .findFirst()
            .orElse(null);
    }

    private static void validateBean(CreateExperimentalProjectInput input) {
        Set<ConstraintViolation<CreateExperimentalProjectInput>> violations = VALIDATOR.validate(
            input
        );
        if (!violations.isEmpty()) {
            throw error(
                violations
                    .stream()
                    .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                    .sorted()
                    .collect(Collectors.joining("; "))
            );
        }
    }

    private static String resolveId(CreateExperimentalProjectInput input) {
        String id = input.id();
        if (id == null || id.isBlank()) {
            id =
                input
                    .name()
                    .toLowerCase(Locale.ROOT)
                    .replaceAll("[^a-z0-9]+", "-")
                    .replaceAll("^-+|-+$", "");
        }
        if (!id.matches("[a-z0-9]+(-[a-z0-9]+)*")) {
            throw error("Invalid project id: " + id);
        }
        return id;
    }

    private static List<CheckedImage> checkImages(List<ProjectImageInput> inputs) {
        List<CheckedImage> checked = new ArrayList<>();
        Set<String> names = new HashSet<>();
        int icons = 0;
        for (ProjectImageInput input : inputs) {
            if (!input.name().matches("[a-z0-9]+(_[a-z0-9]+)*")) {
                throw error(
                    "Invalid image name: " +
                    input.name() +
                    " (use lowercase letters, digits, and underscores)"
                );
            }
            if (!names.add(input.name())) {
                throw error("Duplicate image name: " + input.name());
            }
            if (Boolean.TRUE.equals(input.icon())) {
                icons++;
            }
            Path source = Path.of(input.sourcePath());
            if (!Files.isRegularFile(source) || !Files.isReadable(source)) {
                throw error("Image source is not a readable file: " + input.sourcePath());
            }
            ProjectImage.Extension extension = checkFormat(source);
            checked.add(
                new CheckedImage(
                    source,
                    input.name(),
                    input.alt(),
                    Boolean.TRUE.equals(input.icon()),
                    extension
                )
            );
        }
        if (icons > 1) {
            throw error("Exactly one image can be marked as the icon");
        }
        return checked;
    }

    private static ProjectImage.Extension checkFormat(Path source) {
        ProjectImage.Extension byExtension = extensionOf(source);
        ProjectImage.Extension sniffed;
        try {
            sniffed = sniff(source);
        } catch (IOException e) {
            throw error("Could not read image source: " + source);
        }
        if (byExtension == null || sniffed == null || byExtension != sniffed) {
            throw error(
                "Unsupported image format for " +
                source +
                " (supported: JPG, PNG, GIF, SVG; the file content must match its extension)"
            );
        }
        return sniffed;
    }

    private static ProjectImage.Extension extensionOf(Path source) {
        String fileName = source.getFileName().toString().toLowerCase(Locale.ROOT);
        int dot = fileName.lastIndexOf('.');
        if (dot < 0) {
            return null;
        }
        return switch (fileName.substring(dot + 1)) {
            case "jpg", "jpeg" -> ProjectImage.Extension.JPG;
            case "png" -> ProjectImage.Extension.PNG;
            case "gif" -> ProjectImage.Extension.GIF;
            case "svg" -> ProjectImage.Extension.SVG;
            default -> null;
        };
    }

    private static ProjectImage.Extension sniff(Path source) throws IOException {
        byte[] head;
        try (InputStream in = Files.newInputStream(source)) {
            head = in.readNBytes(1024);
        }
        if (
            head.length >= 3 &&
            (head[0] & 0xFF) == 0xFF &&
            (head[1] & 0xFF) == 0xD8 &&
            (head[2] & 0xFF) == 0xFF
        ) {
            return ProjectImage.Extension.JPG;
        }
        if (
            head.length >= 4 &&
            head[0] == (byte) 0x89 &&
            head[1] == 'P' &&
            head[2] == 'N' &&
            head[3] == 'G'
        ) {
            return ProjectImage.Extension.PNG;
        }
        if (
            head.length >= 4 &&
            head[0] == 'G' &&
            head[1] == 'I' &&
            head[2] == 'F' &&
            head[3] == '8'
        ) {
            return ProjectImage.Extension.GIF;
        }
        if (new String(head, StandardCharsets.UTF_8).contains("<svg")) {
            return ProjectImage.Extension.SVG;
        }
        return null;
    }

    private static String storedExtension(ProjectImage.Extension extension) {
        return extension.name().toLowerCase(Locale.ROOT);
    }

    private static Path resourceFile(String id) {
        return Path.of(
            AppRoot.PATH,
            "src/main/resources/projects",
            CATEGORY.resourceDirectory(),
            id.replace('-', '_') + ".json"
        );
    }

    private static Path assetsDir(String id) {
        return Path.of(
            AppRoot.PATH,
            "frontend/src/assets/img/projects",
            CATEGORY.resourceDirectory(),
            id.replace('-', '_')
        );
    }

    private static GraphqlErrorException conflict(String id) {
        return error("A different project already exists with id: " + id);
    }

    private static GraphqlErrorException error(String message) {
        return GraphqlErrorException.newErrorException().message(message).build();
    }
}
