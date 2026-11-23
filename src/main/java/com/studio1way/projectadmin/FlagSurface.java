package com.studio1way.projectadmin;

import graphql.schema.GraphQLEnumType;
import graphql.schema.GraphQLEnumValueDefinition;
import graphql.schema.GraphQLInputObjectField;
import graphql.schema.GraphQLInputObjectType;
import graphql.schema.GraphQLList;
import graphql.schema.GraphQLNamedType;
import graphql.schema.GraphQLNonNull;
import graphql.schema.GraphQLSchema;
import graphql.schema.GraphQLType;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * The flag surface of one category's create input, derived from the
 * authoring schema. One traversal builds a node tree; --describe
 * renders it and the create driver flattens it into flag specs, so
 * the documented flags and the accepted flags cannot drift apart.
 */
public final class FlagSurface {

    private FlagSurface() {}

    public sealed interface FlagNode {
        record Scalar(
            String flag,
            List<String> path,
            String typeName,
            boolean required,
            boolean repeatable,
            List<String> enumValues
        )
            implements FlagNode {}

        record Group(
            String flag,
            String fieldName,
            boolean required,
            boolean repeatable,
            List<FlagNode> children
        )
            implements FlagNode {}
    }

    public record FlagSpec(
        String flag,
        List<String> path,
        String typeName,
        boolean required,
        List<String> enumValues,
        String groupField,
        String groupFirstField
    ) {
        public boolean isGroupItem() {
            return groupField != null;
        }

        public String field() {
            return path.get(path.size() - 1);
        }
    }

    public static List<FlagNode> nodes(Category category, GraphQLSchema schema) {
        GraphQLInputObjectType input = (GraphQLInputObjectType) schema.getType(
            category.inputTypeName()
        );
        return buildNodes(input, "", List.of());
    }

    public static List<FlagSpec> specs(Category category, GraphQLSchema schema) {
        List<FlagSpec> specs = new ArrayList<>();
        flatten(nodes(category, schema), null, null, specs);
        return specs;
    }

    public static String describe(Category category, GraphQLSchema schema) {
        StringBuilder out = new StringBuilder();
        out
            .append("Flags for ")
            .append(category.cliName())
            .append(" (derived from ")
            .append(category.inputTypeName())
            .append("):\n\n");
        for (FlagNode node : nodes(category, schema)) {
            appendNode(out, node, "  ");
        }
        out.append("\nExample:\n  ").append(category.exampleCommand()).append("\n");
        return out.toString();
    }

    private static void flatten(
        List<FlagNode> nodes,
        String groupField,
        String groupFirstField,
        List<FlagSpec> out
    ) {
        for (FlagNode node : nodes) {
            if (node instanceof FlagNode.Scalar scalar) {
                out.add(
                    new FlagSpec(
                        scalar.flag(),
                        scalar.path(),
                        scalar.typeName(),
                        scalar.required(),
                        scalar.enumValues(),
                        groupField,
                        groupFirstField
                    )
                );
            } else if (node instanceof FlagNode.Group group) {
                if (group.repeatable()) {
                    String firstField = group
                        .children()
                        .stream()
                        .filter(child -> child instanceof FlagNode.Scalar)
                        .map(child -> {
                            List<String> path = ((FlagNode.Scalar) child).path();
                            return path.get(path.size() - 1);
                        })
                        .findFirst()
                        .orElse(null);
                    flatten(group.children(), group.fieldName(), firstField, out);
                } else {
                    flatten(group.children(), groupField, groupFirstField, out);
                }
            }
        }
    }

    private static List<FlagNode> buildNodes(
        GraphQLInputObjectType input,
        String prefix,
        List<String> pathPrefix
    ) {
        List<FlagNode> nodes = new ArrayList<>();
        for (GraphQLInputObjectField field : input.getFieldDefinitions()) {
            boolean required = field.getType() instanceof GraphQLNonNull;
            GraphQLType core = required
                ? ((GraphQLNonNull) field.getType()).getWrappedType()
                : field.getType();
            String flag = prefix + kebab(field.getName());
            List<String> path = new ArrayList<>(pathPrefix);
            path.add(field.getName());

            if (core instanceof GraphQLList list) {
                GraphQLType element = unwrapNonNull(list.getWrappedType());
                if (element instanceof GraphQLInputObjectType inputObject) {
                    String groupFlag = singular(flag);
                    nodes.add(
                        new FlagNode.Group(
                            groupFlag,
                            field.getName(),
                            required,
                            true,
                            buildNodes(inputObject, groupFlag + "-", path)
                        )
                    );
                } else {
                    nodes.add(
                        new FlagNode.Scalar(
                            flag,
                            path,
                            ((GraphQLNamedType) element).getName(),
                            required,
                            true,
                            enumValues(element)
                        )
                    );
                }
            } else if (core instanceof GraphQLInputObjectType inputObject) {
                nodes.add(
                    new FlagNode.Group(
                        flag,
                        field.getName(),
                        required,
                        false,
                        buildNodes(inputObject, flag + "-", path)
                    )
                );
            } else {
                nodes.add(
                    new FlagNode.Scalar(
                        flag,
                        path,
                        ((GraphQLNamedType) core).getName(),
                        required,
                        false,
                        enumValues(core)
                    )
                );
            }
        }
        return nodes;
    }

    private static void appendNode(StringBuilder out, FlagNode node, String indent) {
        if (node instanceof FlagNode.Scalar scalar) {
            appendScalar(out, indent, scalar);
        } else if (node instanceof FlagNode.Group group) {
            appendGroupHeader(
                out,
                indent,
                group.flag(),
                group.required(),
                group.repeatable()
            );
            for (FlagNode child : group.children()) {
                appendNode(out, child, indent + "  ");
            }
        }
    }

    private static void appendGroupHeader(
        StringBuilder out,
        String indent,
        String flag,
        boolean required,
        boolean repeatable
    ) {
        out.append(indent).append("--").append(flag).append(" (");
        if (required) {
            out.append("required");
            if (repeatable) {
                out.append(", ");
            }
        }
        if (repeatable) {
            out.append("repeatable");
        }
        if (!required && !repeatable) {
            out.append("optional");
        }
        out.append("):\n");
    }

    private static void appendScalar(
        StringBuilder out,
        String indent,
        FlagNode.Scalar scalar
    ) {
        out
            .append(indent)
            .append("--")
            .append(scalar.flag())
            .append(" <")
            .append(scalar.typeName())
            .append(">");
        if (scalar.required()) {
            out.append(" (required)");
        }
        if (scalar.repeatable()) {
            out.append(" (repeatable)");
        }
        if (!scalar.enumValues().isEmpty()) {
            out.append(" (one of: ");
            out.append(String.join(", ", scalar.enumValues()));
            out.append(")");
        }
        out.append("\n");
    }

    private static List<String> enumValues(GraphQLType type) {
        if (type instanceof GraphQLEnumType enumType) {
            return enumType
                .getValues()
                .stream()
                .map(GraphQLEnumValueDefinition::getName)
                .collect(Collectors.toList());
        }
        return List.of();
    }

    private static GraphQLType unwrapNonNull(GraphQLType type) {
        return type instanceof GraphQLNonNull nonNull ? nonNull.getWrappedType() : type;
    }

    private static String singular(String flag) {
        return flag.endsWith("s") ? flag.substring(0, flag.length() - 1) : flag;
    }

    private static String kebab(String camelCase) {
        StringBuilder out = new StringBuilder();
        for (char c : camelCase.toCharArray()) {
            if (Character.isUpperCase(c)) {
                out.append('-').append(Character.toLowerCase(c));
            } else {
                out.append(c);
            }
        }
        return out.toString();
    }
}
