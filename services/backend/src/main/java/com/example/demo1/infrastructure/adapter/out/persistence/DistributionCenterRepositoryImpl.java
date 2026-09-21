package com.example.demo1.infrastructure.adapter.out.persistence;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo1.domain.DistributionCenter;
import com.example.demo1.domain.port.out.DistributionCenterRepository;

@Component
public class DistributionCenterRepositoryImpl implements DistributionCenterRepository {
    private final DistributionCenterJpaRepository repository;

    public DistributionCenterRepositoryImpl(DistributionCenterJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public DistributionCenter save(DistributionCenter distributionCenter) {
        return toDomain(repository.save(toEntity(distributionCenter)));
    }

    @Override
    public List<DistributionCenter> findAll() {
        return repository.findAll().stream().map(this::toDomain).toList();
    }

    @Override
    public boolean existsByCode(String code) {
        return repository.existsByCode(code);
    }

    private DistributionCenterJpaEntity toEntity(DistributionCenter distributionCenter) {
        return new DistributionCenterJpaEntity(distributionCenter.getId(), distributionCenter.getCode(),
                distributionCenter.getName(), distributionCenter.getAddress(), distributionCenter.getCity());
    }

    private DistributionCenter toDomain(DistributionCenterJpaEntity entity) {
        return new DistributionCenter(entity.getId(), entity.getCode(), entity.getName(),
                entity.getAddress(), entity.getCity());
    }
}
