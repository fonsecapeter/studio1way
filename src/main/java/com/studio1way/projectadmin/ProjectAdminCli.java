package com.studio1way.projectadmin;

import graphql.ExecutionResult;
import graphql.GraphQLError;
import java.io.PrintStream;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import org.springframework.graphql.ExecutionGraphQlRequest;
import org.springframework.graphql.support.DefaultExecutionGraphQlRequest;

public final class ProjectAdminCli {

    private ProjectAdminCli() {}

    public static int run(String[] args, PrintStream out, PrintStream err) {
        if (args.length == 1 && "--help".equals(args[0])) {
            out.print(help());
            return 0;
        }
        if (args.length > 0 && "--describe".equals(args[0])) {
            return describe(args, out, err);
        }
        if (args.length > 0 && "create".equals(args[0])) {
            return create(args, out, err);
        }
        err.println("Unsupported arguments: " + String.join(" ", args));
        err.println("Run bin/add-project --help");
        return 1;
    }

    private static int describe(String[] args, PrintStream out, PrintStream err) {
        if (args.length != 2) {
            err.println("Usage: bin/add-project --describe <category>");
            err.println(supportedCategories());
            return 1;
        }
        Optional<Category> category = Category.fromCliName(args[1]);
        if (category.isEmpty()) {
            err.println("Unknown category: " + args[1]);
            err.println(supportedCategories());
            return 1;
        }
        out.print(
            FlagSurface.describe(category.get(), AuthoringSchema.graphQlSource().schema())
        );
        return 0;
    }

    private static int create(String[] args, PrintStream out, PrintStream err) {
        if (args.length < 2) {
            err.println("Usage: bin/add-project create <category> [flags]");
            err.println(supportedCategories());
            return 1;
        }
        Optional<Category> found = Category.fromCliName(args[1]);
        if (found.isEmpty()) {
            err.println("Unknown category: " + args[1]);
            err.println(supportedCategories());
            return 1;
        }
        Category category = found.get();
        if (!category.createSupported()) {
            err.println(
                "Create is not supported yet for category: " + category.cliName()
            );
            return 1;
        }
        List<FlagSurface.FlagSpec> specs = FlagSurface.specs(
            category,
            AuthoringSchema.graphQlSource().schema()
        );
        Map<String, Object> input;
        try {
            input = new FlagParser(specs).parse(args, 2);
        } catch (IllegalArgumentException e) {
            err.println(e.getMessage());
            err.println(validFlags(specs));
            return 1;
        }
        defaultImageNames(input);
        ExecutionGraphQlRequest request = new DefaultExecutionGraphQlRequest(
            category.mutationDocument(),
            null,
            Map.of("input", input),
            Map.of(),
            "bin/add-project",
            Locale.ENGLISH
        );
        ExecutionResult result = AuthoringSchema
            .executionService()
            .execute(request)
            .block()
            .getExecutionResult();
        if (!result.getErrors().isEmpty()) {
            for (GraphQLError error : result.getErrors()) {
                err.println("Error: " + error.getMessage());
            }
            return 1;
        }
        Map<String, Object> data = result.getData();
        @SuppressWarnings("unchecked")
        Map<String, Object> created = (Map<String, Object>) data.get(
            category.mutationName()
        );
        out.println(
            "Created " +
            category.cliName() +
            ": " +
            created.get("id") +
            " (" +
            created.get("name") +
            ")"
        );
        return 0;
    }

    /** Image names default to the source file's stem when not given. */
    private static void defaultImageNames(Map<String, Object> input) {
        if (input.get("images") instanceof List<?> images) {
            for (Object item : images) {
                @SuppressWarnings("unchecked")
                Map<String, Object> image = (Map<String, Object>) item;
                if (
                    !image.containsKey("name") &&
                    image.get("sourcePath") instanceof String sourcePath
                ) {
                    image.put("name", imageNameFromPath(sourcePath));
                }
            }
        }
    }

    private static String imageNameFromPath(String sourcePath) {
        String file = sourcePath.substring(sourcePath.lastIndexOf('/') + 1);
        int dot = file.lastIndexOf('.');
        if (dot > 0) {
            file = file.substring(0, dot);
        }
        return file
            .toLowerCase(Locale.ROOT)
            .replaceAll("[^a-z0-9]+", "_")
            .replaceAll("^_+|_+$", "");
    }

    private static String validFlags(List<FlagSurface.FlagSpec> specs) {
        StringBuilder out = new StringBuilder("Valid flags:");
        for (FlagSurface.FlagSpec spec : specs) {
            out.append(" --").append(spec.flag());
        }
        return out.toString();
    }

    private static String help() {
        StringBuilder out = new StringBuilder();
        out.append("Add a project to the Studio 1Way portfolio.\n\n");
        out.append("Usage:\n");
        out.append("  bin/add-project create <category> [flags]\n");
        out.append("  bin/add-project --describe <category>\n");
        out.append("  bin/add-project --help\n\n");
        out.append("Describe a category's create flags:\n");
        for (Category category : Category.values()) {
            out
                .append("  bin/add-project --describe ")
                .append(category.cliName())
                .append("\n");
        }
        return out.toString();
    }

    private static String supportedCategories() {
        StringBuilder out = new StringBuilder("Supported categories:");
        for (Category category : Category.values()) {
            out.append(" ").append(category.cliName());
        }
        return out.toString();
    }
}
