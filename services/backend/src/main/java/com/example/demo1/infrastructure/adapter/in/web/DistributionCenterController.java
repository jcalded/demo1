package com.example.demo1.infrastructure.adapter.in.web;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo1.application.service.DistributionCenterService;
import com.example.demo1.domain.DistributionCenter;
import com.example.demo1.infrastructure.adapter.in.web.dto.DistributionCenterRequest;
import com.example.demo1.infrastructure.adapter.in.web.dto.DistributionCenterResponse;

@RestController
@RequestMapping("/api/distribution-centers")
public class DistributionCenterController {
    private final DistributionCenterService service;

    public DistributionCenterController(DistributionCenterService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<DistributionCenterResponse> registerDistributionCenter(
            @RequestBody DistributionCenterRequest request) {
        DistributionCenter center = service.registerDistributionCenter(new DistributionCenter(null,
                request.getCode(), request.getName(), request.getAddress(), request.getCity()));
        return ResponseEntity.status(201).body(toResponse(center));
    }

    @GetMapping
    public ResponseEntity<?> listDistributionCenters() {
        List<DistributionCenter> centers = service.listDistributionCenters();
        if (centers.isEmpty()) {
            return ResponseEntity.ok(Map.of("message", "No records found"));
        }
        return ResponseEntity.ok(centers.stream().map(this::toResponse).toList());
    }

    private DistributionCenterResponse toResponse(DistributionCenter center) {
        return new DistributionCenterResponse(center.getId(), center.getCode(), center.getName(),
                center.getAddress(), center.getCity());
    }
}
