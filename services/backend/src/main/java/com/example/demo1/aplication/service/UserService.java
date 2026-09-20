package com.example.demo1.aplication.service;

import org.springframework.stereotype.Service;

import com.example.demo1.aplication.port.in.CreateUserUseCase;
import com.example.demo1.aplication.port.out.UserRepositoryPort;

import domain.model.User;

@Service 
public class UserService implements CreateUserUseCase {
    private final UserRepositoryPort userRepositoryPort;

    public UserService(UserRepositoryPort userRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
    }

    @Override 
    public User createUser(User user) {
        if (user.getName() == null || user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Name and email cannot be null");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Name and email cannot be null");
        }

        return userRepositoryPort.save(user);
    }
    
}
