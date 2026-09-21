package com.example.demo1.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreJpaRepository extends JpaRepository<StoreJpaEntity, Long> {
    boolean existsByCode(String code);
}
