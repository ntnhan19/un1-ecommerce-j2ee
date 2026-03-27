package com.un1.ecommerce.mapper;

import com.un1.ecommerce.dto.request.ProductRequest;
import com.un1.ecommerce.dto.response.ProductResponse;
import com.un1.ecommerce.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public Product toEntity(ProductRequest request) {
        if (request == null) return null;
        
        return Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .stock(request.getStock())
                .description(request.getDescription())
                .imageUrls(request.getImageUrls())
                .colors(request.getColors())
                .sizes(request.getSizes())
                // Category validation and assignment will be handled in Service layer
                .build();
    }

    public ProductResponse toResponse(Product product) {
        if (product == null) return null;
        
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .stock(product.getStock())
                .description(product.getDescription())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .imageUrls(product.getImageUrls())
                .colors(product.getColors())
                .sizes(product.getSizes())
                .build();
    }

    public void updateEntityFromRequest(ProductRequest request, Product product) {
        if (request == null || product == null) return;
        
        if (request.getName() != null) {
            product.setName(request.getName());
        }
        if (request.getPrice() != null) {
            product.setPrice(request.getPrice());
        }
        if (request.getStock() != null) {
            product.setStock(request.getStock());
        }
        if (request.getDescription() != null) {
            product.setDescription(request.getDescription());
        }
        if (request.getImageUrls() != null) {
            product.setImageUrls(request.getImageUrls());
        }
        if (request.getColors() != null) {
            product.setColors(request.getColors());
        }
        if (request.getSizes() != null) {
            product.setSizes(request.getSizes());
        }
    }
}
