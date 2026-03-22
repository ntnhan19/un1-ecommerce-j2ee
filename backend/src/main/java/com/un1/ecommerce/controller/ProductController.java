package com.un1.ecommerce.controller;

import com.un1.ecommerce.entity.Product;
import com.un1.ecommerce.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@SuppressWarnings("null")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Lấy danh sách sản phẩm (có phân trang và tìm kiếm) (PROD-TC-002, PROD-TC-010)
    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(name = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findByNameContainingIgnoreCase(keyword, pageable);
        
        return ResponseEntity.ok(productPage);
    }

    // Lấy sản phẩm theo ID (PROD-TC-003, PROD-TC-004)
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Thêm sản phẩm (PROD-TC-005, 006, 007)
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    // Cập nhật sản phẩm (PROD-TC-008)
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @Valid @RequestBody Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            // Chỉ cập nhật thông tin cơ bản
            existingProduct.setName(productDetails.getName());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setStock(productDetails.getStock());
            existingProduct.setDescription(productDetails.getDescription());
            
            Product updatedProduct = productRepository.save(existingProduct);
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Xóa sản phẩm (PROD-TC-009)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            productRepository.delete(optionalProduct.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
