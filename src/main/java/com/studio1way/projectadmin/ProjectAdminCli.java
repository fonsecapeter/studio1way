package com.studio1way.projectadmin;

import java.io.PrintStream;
import java.util.Optional;

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
