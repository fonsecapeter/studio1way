package com.studio1way.studio1way.repository;

import java.util.*;

public class InMemoryReadOnlyRepository<T, ID> implements ReadOnlyRepository<T, ID> {

    private final LinkedHashMap<String, T> data = new LinkedHashMap<>();

    public InMemoryReadOnlyRepository() {}

    public InMemoryReadOnlyRepository(Map<String, T> initialData) {
        this.data.putAll(initialData);
    }

    @Override
    public T findById(ID id) {
        return data.get(id);
    }

    @Override
    public List<T> findAll() {
        return new ArrayList<>(data.values());
    }
}
