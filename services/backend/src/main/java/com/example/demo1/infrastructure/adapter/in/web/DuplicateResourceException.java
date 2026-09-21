package com.example.demo1.infrastructure.adapter.in.web;

public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }
}
