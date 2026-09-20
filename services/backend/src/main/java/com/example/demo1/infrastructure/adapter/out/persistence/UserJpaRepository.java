package com.example.demo1.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJpaRepository
    extends JpaRepository<UserJpaEntity, Long> {
    
}
