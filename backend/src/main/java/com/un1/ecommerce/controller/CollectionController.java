package com.un1.ecommerce.controller;

import com.un1.ecommerce.entity.Collection;
import com.un1.ecommerce.repository.CollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/collections")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CollectionController {

    private final CollectionRepository collectionRepository;

    @GetMapping
    public ResponseEntity<List<Collection>> getAllActiveCollections() {
        return ResponseEntity.ok(collectionRepository.findByActiveTrue());
    }

    @PostMapping
    public ResponseEntity<Collection> createCollection(@RequestBody Collection collection) {
        return ResponseEntity.ok(collectionRepository.save(collection));
    }
}
