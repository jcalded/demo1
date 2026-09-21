package com.example.demo1.domain.port.out;

import java.util.List;

import com.example.demo1.domain.Product;

public interface ProductRepository {
    Product save(Product product);
    List<Product> findAll();
    boolean existsByCode(String code);
}
