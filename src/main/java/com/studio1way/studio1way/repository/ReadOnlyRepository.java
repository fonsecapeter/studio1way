package com.studio1way.studio1way.repository;

import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ReadOnlyRepository<T, ID> extends Repository {

    Optional<T> findById(ID id);

    List<T> findAll();

}
