package com.example.demo1.aplication.port.in;

import domain.model.User;

public interface CreateUserUseCase {
    User createUser(User user);
}
