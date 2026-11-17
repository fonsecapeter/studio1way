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
import java.util.stream.Collectors;

public final class FlagSurface {

    private FlagSurface() {}

    public static String describe(Category category, GraphQLSchema schema) {
        GraphQLInputObjectType input = (GraphQLInputObjectType) schema.getType(
            category.inputTypeName()
        );
        StringBuilder out = new StringBuilder();
        out
            .append("Flags for ")
            .append(category.cliName())
            .append(" (derived from ")
            .append(category.inputTypeName())
            .append("):\n\n");
        for (GraphQLInputObjectField field : input.getFieldDefinitions()) {
            appendField(out, field, "", "  ");
        }
        out.append("\nExample:\n  ").append(category.exampleCommand()).append("\n");
        return out.toString();
    }

    private static void appendField(
        StringBuilder out,
        GraphQLInputObjectField field,
        String prefix,
        String indent
    ) {
        boolean required = field.getType() instanceof GraphQLNonNull;
        GraphQLType core = required
            ? ((GraphQLNonNull) field.getType()).getWrappedType()
            : field.getType();
        String flag = prefix + kebab(field.getName());

        if (core instanceof GraphQLList list) {
            GraphQLType element = unwrapNonNull(list.getWrappedType());
            if (element instanceof GraphQLInputObjectType inputObject) {
                String groupFlag = singular(flag);
                appendGroupHeader(out, indent, groupFlag, required, true);
                appendSubFields(out, inputObject, groupFlag, indent);
            } else {
                appendScalar(
                    out,
                    indent,
                    flag,
                    (GraphQLNamedType) element,
                    required,
                    true
                );
            }
        } else if (core instanceof GraphQLInputObjectType inputObject) {
            appendGroupHeader(out, indent, flag, required, false);
            appendSubFields(out, inputObject, flag, indent);
        } else {
            appendScalar(out, indent, flag, (GraphQLNamedType) core, required, false);
        }
    }

    private static void appendSubFields(
        StringBuilder out,
        GraphQLInputObjectType inputObject,
        String flag,
        String indent
    ) {
        for (GraphQLInputObjectField subField : inputObject.getFieldDefinitions()) {
            appendField(out, subField, flag + "-", indent + "  ");
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
        String flag,
        GraphQLNamedType type,
        boolean required,
        boolean repeatable
    ) {
        out
            .append(indent)
            .append("--")
            .append(flag)
            .append(" <")
            .append(type.getName())
            .append(">");
        if (required) {
            out.append(" (required)");
        }
        if (repeatable) {
            out.append(" (repeatable)");
        }
        if (type instanceof GraphQLEnumType enumType) {
            out.append(" (one of: ");
            out.append(
                enumType
                    .getValues()
                    .stream()
                    .map(GraphQLEnumValueDefinition::getName)
                    .collect(Collectors.joining(", "))
            );
            out.append(")");
        }
        out.append("\n");
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
