package com.example.demo1.domain.port.out;

import java.util.List;

import com.example.demo1.domain.DistributionCenter;

public interface DistributionCenterRepository {
    DistributionCenter save(DistributionCenter distributionCenter);
    List<DistributionCenter> findAll();
    boolean existsByCode(String code);
}
