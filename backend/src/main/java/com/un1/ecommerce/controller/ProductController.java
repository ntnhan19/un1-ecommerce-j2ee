package com.un1.ecommerce.controller;

import com.un1.ecommerce.dto.request.ProductRequest;
import com.un1.ecommerce.dto.response.ProductResponse;
import com.un1.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@SuppressWarnings("null")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "category", required = false) Long categoryId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "id,desc") String sort) {

        String[] sortParams = sort.split(",");
        String sortBy = sortParams[0];
        String sortDir = sortParams.length > 1 ? sortParams[1] : "asc";
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<ProductResponse> products = productService.getAllProducts(keyword, categoryId, pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest productRequest) {
        ProductResponse response = productService.createProduct(productRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable("id") Long id,
            @Valid @RequestBody ProductRequest productRequest) {
        return ResponseEntity.ok(productService.updateProduct(id, productRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
