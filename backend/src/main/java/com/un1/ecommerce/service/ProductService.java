package com.un1.ecommerce.service;

import com.un1.ecommerce.dto.request.ProductRequest;
import com.un1.ecommerce.dto.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    ProductResponse createProduct(ProductRequest request);
    ProductResponse getProductById(Long id);
    ProductResponse updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
    Page<ProductResponse> getAllProducts(String keyword, Long categoryId, Boolean featured, Pageable pageable);
    long countTotalProducts();
    java.util.List<ProductResponse> getAllProductsList();
}
