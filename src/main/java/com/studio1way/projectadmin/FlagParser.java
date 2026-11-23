package com.studio1way.projectadmin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Turns create flags into the mutation's input map. The flag set is
 * the one FlagSurface derives from the authoring schema: unknown
 * flags are rejected, nested inputs flatten by prefix, and a
 * repeatable group starts a new item when its first flag repeats.
 */
final class FlagParser {

    private final List<FlagSurface.FlagSpec> specs;
    private final Map<String, FlagSurface.FlagSpec> byFlag;

    FlagParser(List<FlagSurface.FlagSpec> specs) {
        this.specs = specs;
        this.byFlag =
            specs
                .stream()
                .collect(
                    Collectors.toMap(FlagSurface.FlagSpec::flag, Function.identity())
                );
    }

    Map<String, Object> parse(String[] args, int offset) {
        Map<String, Object> input = new LinkedHashMap<>();
        Map<String, Map<String, Object>> currentItems = new HashMap<>();
        for (int i = offset; i < args.length; i++) {
            String token = args[i];
            if (!token.startsWith("--")) {
                throw new IllegalArgumentException("Expected a flag but got: " + token);
            }
            FlagSurface.FlagSpec spec = byFlag.get(token.substring(2));
            if (spec == null) {
                throw new IllegalArgumentException("Unknown flag: " + token);
            }
            if (i + 1 >= args.length || args[i + 1].startsWith("--")) {
                throw new IllegalArgumentException("Flag " + token + " expects a value");
            }
            Object value = convert(spec, token, args[++i]);
            if (spec.isGroupItem()) {
                putGroupValue(input, currentItems, spec, token, value);
            } else if (spec.path().size() == 2) {
                @SuppressWarnings("unchecked")
                Map<String, Object> object = (Map<String, Object>) input.computeIfAbsent(
                    spec.path().get(0),
                    key -> new LinkedHashMap<String, Object>()
                );
                if (object.containsKey(spec.field())) {
                    throw new IllegalArgumentException("Duplicate flag: " + token);
                }
                object.put(spec.field(), value);
            } else {
                if (input.containsKey(spec.field())) {
                    throw new IllegalArgumentException("Duplicate flag: " + token);
                }
                input.put(spec.field(), value);
            }
        }
        return input;
    }

    private void putGroupValue(
        Map<String, Object> input,
        Map<String, Map<String, Object>> currentItems,
        FlagSurface.FlagSpec spec,
        String token,
        Object value
    ) {
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) input.computeIfAbsent(
            spec.groupField(),
            key -> new ArrayList<>()
        );
        Map<String, Object> item = currentItems.get(spec.groupField());
        boolean startsNew =
            item == null ||
            (
                spec.field().equals(spec.groupFirstField()) &&
                item.containsKey(spec.field())
            );
        if (startsNew) {
            item = new LinkedHashMap<>();
            items.add(item);
            currentItems.put(spec.groupField(), item);
        }
        if (item.containsKey(spec.field())) {
            throw new IllegalArgumentException(
                "Flag " +
                token +
                " repeats within one group; start a new item with --" +
                groupFirstFlag(spec)
            );
        }
        item.put(spec.field(), value);
    }

    private String groupFirstFlag(FlagSurface.FlagSpec spec) {
        return specs
            .stream()
            .filter(other ->
                spec.groupField().equals(other.groupField()) &&
                spec.groupFirstField().equals(other.field())
            )
            .map(FlagSurface.FlagSpec::flag)
            .findFirst()
            .orElse(spec.groupFirstField());
    }

    private static Object convert(FlagSurface.FlagSpec spec, String token, String raw) {
        switch (spec.typeName()) {
            case "Float":
                try {
                    return Double.valueOf(raw);
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException(
                        "Invalid value for " +
                        token +
                        ": \"" +
                        raw +
                        "\" (expected a number)"
                    );
                }
            case "Int":
                try {
                    return Integer.valueOf(raw);
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException(
                        "Invalid value for " +
                        token +
                        ": \"" +
                        raw +
                        "\" (expected a whole number)"
                    );
                }
            case "Boolean":
                if ("true".equals(raw)) {
                    return Boolean.TRUE;
                }
                if ("false".equals(raw)) {
                    return Boolean.FALSE;
                }
                throw new IllegalArgumentException(
                    "Invalid value for " +
                    token +
                    ": \"" +
                    raw +
                    "\" (expected true or false)"
                );
            default:
                return raw;
        }
    }
}
