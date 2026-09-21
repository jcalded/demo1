package com.example.demo1.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DistributionCenterJpaRepository extends JpaRepository<DistributionCenterJpaEntity, Long> {
    boolean existsByCode(String code);
}
