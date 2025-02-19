package com.studio1way.studio1way.repository;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class InMemoryReadOnlyRepository<T, ID> implements ReadOnlyRepository<T, ID> {
    private final List<T> data = new ArrayList<>();

    public InMemoryReadOnlyRepository(List<T> initialData) {
        this.data.addAll(initialData);
    }

    @Override
    public Optional<T> findById(ID id) {
        return data.stream().filter(
            item -> {
                try {
                    return item.getClass().getMethod("getId").invoke(item).equals(id);
                } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
                    throw new RuntimeException(e);
                }
            }
        ).findFirst();
    }

    @Override
    public List<T> findAll() {
        return new ArrayList<>(data);
    }
}
