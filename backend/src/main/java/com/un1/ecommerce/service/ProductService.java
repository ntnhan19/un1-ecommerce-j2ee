package com.un1.ecommerce.service;

import com.un1.ecommerce.dto.request.ProductRequest;
import com.un1.ecommerce.dto.response.ProductResponse;
import com.un1.ecommerce.entity.Gender;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    // Thêm gender vào signature
    Page<ProductResponse> getAllProducts(
            String keyword, Long categoryId, Boolean featured, Gender gender, Pageable pageable);

    List<ProductResponse> getAllProductsList();

    ProductResponse getProductById(Long id);

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);

    long countTotalProducts();
}