package com.example.demo1.infrastructure.adapter.in.web.dto;

public class ProductRequest {
    private String code;
    private String name;
    private String description;
    private Double price;

    public ProductRequest() {
    }

    public ProductRequest(String code, String name, String description, Double price) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
