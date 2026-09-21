package com.example.demo1.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductJpaRepository extends JpaRepository<ProductJpaEntity, Long> {
    boolean existsByCode(String code);
}
