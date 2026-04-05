package com.un1.ecommerce.service.impl;

import com.un1.ecommerce.dto.request.ProductRequest;
import com.un1.ecommerce.dto.response.ProductResponse;
import com.un1.ecommerce.entity.Category;
import com.un1.ecommerce.entity.Product;
import com.un1.ecommerce.exception.ResourceNotFoundException;
import com.un1.ecommerce.mapper.ProductMapper;
import com.un1.ecommerce.repository.CategoryRepository;
import com.un1.ecommerce.repository.ProductRepository;
import com.un1.ecommerce.service.ProductService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
@org.springframework.transaction.annotation.Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Product product = productMapper.toEntity(request);
        
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục với id " + request.getCategoryId()));
            product.setCategory(category);
        }

        Product savedProduct = productRepository.save(product);
        return productMapper.toResponse(savedProduct);
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với id " + id));
        return productMapper.toResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với id " + id));

        productMapper.updateEntityFromRequest(request, product);

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục với id " + request.getCategoryId()));
            product.setCategory(category);
        } else {
            product.setCategory(null);
        }

        Product updatedProduct = productRepository.save(product);
        return productMapper.toResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với id " + id));
        productRepository.delete(product);
    }

    @Override
    public Page<ProductResponse> getAllProducts(String keyword, Long categoryId, Boolean featured, Pageable pageable) {
        Specification<Product> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (keyword != null && !keyword.trim().isEmpty()) {
                System.out.println("DEBUG: Searching products with keyword: [" + keyword + "]");
                String searchKeyword = "%" + keyword.toLowerCase() + "%";
                Predicate nameLike = cb.like(cb.lower(root.get("name").as(String.class)), searchKeyword);
                predicates.add(nameLike);
            }
            
            if (categoryId != null) {
                predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            }

            if (featured != null) {
                predicates.add(cb.equal(root.get("featured"), featured));
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Product> products = productRepository.findAll(spec, pageable);
        return products.map(productMapper::toResponse);
    }

    @Override
    public long countTotalProducts() {
        return productRepository.count();
    }

    @Override
    public java.util.List<ProductResponse> getAllProductsList() {
        return productRepository.findAll().stream()
                .map(productMapper::toResponse)
                .collect(java.util.stream.Collectors.toList());
    }
}
