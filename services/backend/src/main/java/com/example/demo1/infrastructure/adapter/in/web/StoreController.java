package com.example.demo1.infrastructure.adapter.in.web;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo1.application.service.StoreService;
import com.example.demo1.domain.Store;
import com.example.demo1.infrastructure.adapter.in.web.dto.StoreRequest;
import com.example.demo1.infrastructure.adapter.in.web.dto.StoreResponse;

@RestController
@RequestMapping("/api/stores")
public class StoreController {
    private final StoreService service;

    public StoreController(StoreService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<StoreResponse> registerStore(@RequestBody StoreRequest request) {
        Store store = service.registerStore(new Store(null, request.getCode(), request.getName(),
                request.getAddress(), request.getCity()));
        return ResponseEntity.status(201).body(toResponse(store));
    }

    @GetMapping
    public ResponseEntity<?> listStores() {
        List<Store> stores = service.listStores();
        if (stores.isEmpty()) {
            return ResponseEntity.ok(Map.of("message", "No records found"));
        }
        return ResponseEntity.ok(stores.stream().map(this::toResponse).toList());
    }

    private StoreResponse toResponse(Store store) {
        return new StoreResponse(store.getId(), store.getCode(), store.getName(),
                store.getAddress(), store.getCity());
    }
}
