package com.example.demo1.infrastructure.adapter.out.persistence;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo1.domain.Product;
import com.example.demo1.domain.port.out.ProductRepository;

@Component
public class ProductRepositoryImpl implements ProductRepository {
    private final ProductJpaRepository repository;

    public ProductRepositoryImpl(ProductJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Product save(Product product) {
        return toDomain(repository.save(toEntity(product)));
    }

    @Override
    public List<Product> findAll() {
        return repository.findAll().stream().map(this::toDomain).toList();
    }

    @Override
    public boolean existsByCode(String code) {
        return repository.existsByCode(code);
    }

    private ProductJpaEntity toEntity(Product product) {
        return new ProductJpaEntity(product.getId(), product.getCode(), product.getName(),
                product.getDescription(), product.getPrice());
    }

    private Product toDomain(ProductJpaEntity entity) {
        return new Product(entity.getId(), entity.getCode(), entity.getName(),
                entity.getDescription(), entity.getPrice());
    }
}
