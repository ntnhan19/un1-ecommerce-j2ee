package com.un1.ecommerce.controller;

import com.un1.ecommerce.entity.ProductCollection;
import com.un1.ecommerce.repository.ProductCollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/product-collections")
@RequiredArgsConstructor
public class ProductCollectionController {

    private final ProductCollectionRepository productCollectionRepository;

    @GetMapping
    public ResponseEntity<List<ProductCollection>> getAllActiveCollections() {
        return ResponseEntity.ok(productCollectionRepository.findByActiveTrue());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCollection> getCollectionById(@PathVariable Long id) {
        return productCollectionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductCollection> createCollection(@RequestBody ProductCollection collection) {
        return ResponseEntity.ok(productCollectionRepository.save(collection));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductCollection> updateCollection(@PathVariable Long id, @RequestBody ProductCollection collectionDetails) {
        return productCollectionRepository.findById(id)
                .map(collection -> {
                    collection.setName(collectionDetails.getName());
                    collection.setDescription(collectionDetails.getDescription());
                    collection.setCoverUrl(collectionDetails.getCoverUrl());
                    collection.setGalleryUrls(collectionDetails.getGalleryUrls());
                    collection.setActive(collectionDetails.isActive());
                    return ResponseEntity.ok(productCollectionRepository.save(collection));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollection(@PathVariable Long id) {
        return productCollectionRepository.findById(id)
                .map(collection -> {
                    productCollectionRepository.delete(collection);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
