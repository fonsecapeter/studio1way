package com.studio1way.studio1way.repository;

import java.util.List;
import org.springframework.data.repository.Repository;

public interface ReadOnlyRepository<T, ID> extends Repository {
    T findById(ID id);

    List<T> findAll();
}
