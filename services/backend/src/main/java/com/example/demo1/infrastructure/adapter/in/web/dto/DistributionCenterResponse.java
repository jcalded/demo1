package com.example.demo1.infrastructure.adapter.in.web.dto;

public class DistributionCenterResponse {
    private Long id;
    private String code;
    private String name;
    private String address;
    private String city;

    public DistributionCenterResponse() {
    }

    public DistributionCenterResponse(Long id, String code, String name, String address, String city) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.address = address;
        this.city = city;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
}
