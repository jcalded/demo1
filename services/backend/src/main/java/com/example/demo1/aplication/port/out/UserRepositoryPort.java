package com.example.demo1.aplication.port.out;

import java.util.List;
import java.util.Optional;

import domain.model.User;

public interface UserRepositoryPort {
    User save(User user);

    List<User> findAll();

    Optional<User> findById(Long id);

    Void deleteById(Long id);
}

