package com.un1.ecommerce.service.impl;

import com.un1.ecommerce.dto.ColorDto;
import com.un1.ecommerce.dto.request.ProductRequest;
import com.un1.ecommerce.dto.request.ProductVariantRequest;
import com.un1.ecommerce.dto.response.ProductResponse;
import com.un1.ecommerce.entity.Category;
import com.un1.ecommerce.entity.Gender;
import com.un1.ecommerce.entity.Product;
import com.un1.ecommerce.entity.ProductMeasurements;
import com.un1.ecommerce.entity.ProductType;
import com.un1.ecommerce.entity.Gender;
import com.un1.ecommerce.entity.ProductVariant;
import com.un1.ecommerce.mapper.ProductMapper;
import com.un1.ecommerce.repository.CategoryRepository;
import com.un1.ecommerce.repository.ProductRepository;
import com.un1.ecommerce.repository.ProductVariantRepository;
import com.un1.ecommerce.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    // ─── Read ─────────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(
            String keyword, Long categoryId, Boolean featured, Gender gender, Pageable pageable) {
        return productRepository
                .findByFilters(keyword, categoryId, featured, gender, pageable)
                .map(productMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProductsList() {
        return productRepository.findAll().stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        return productMapper.toResponse(findProductOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public long countTotalProducts() {
        return productRepository.count();
    }

    // ─── Write ────────────────────────────────────────────────────────────────

    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Category category = resolveCategoryOrNull(request.getCategoryId());
        ProductType productType = parseProductType(request.getProductType());
        Gender gender = parseGender(request.getGender());

        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .stock(request.getStock() != null ? request.getStock() : 0)
                .description(request.getDescription())
                .category(category)
                .imageUrls(request.getImageUrls() != null ? new ArrayList<>(request.getImageUrls()) : new ArrayList<>())
                .colors(buildColorList(request.getColors()))
                .sizes(request.getSizes() != null ? new ArrayList<>(request.getSizes()) : new ArrayList<>())
                .featured(Boolean.TRUE.equals(request.getFeatured()))
                .productType(productType)
                .gender(gender)
                .build();

        product = productRepository.save(product);

        if (request.getVariants() != null && !request.getVariants().isEmpty()) {
            saveVariants(product, request.getVariants());
            recalculateStock(product);
        }

        return productMapper.toResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = findProductOrThrow(id);

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setCategory(resolveCategoryOrNull(request.getCategoryId()));
        product.setImageUrls(
                request.getImageUrls() != null ? new ArrayList<>(request.getImageUrls()) : new ArrayList<>());
        product.setColors(buildColorList(request.getColors()));
        product.setSizes(request.getSizes() != null ? new ArrayList<>(request.getSizes()) : new ArrayList<>());

        if (request.getFeatured() != null) {
            product.setFeatured(request.getFeatured());
        }
        if (request.getProductType() != null) {
            product.setProductType(parseProductType(request.getProductType()));
        }
        if (request.getGender() != null) {
            product.setGender(parseGender(request.getGender()));
        }

        if (request.getVariants() != null) {
            upsertVariants(product, request.getVariants());
            recalculateStock(product);
        } else if (request.getStock() != null) {
            product.setStock(request.getStock());
        }

        return productMapper.toResponse(productRepository.save(product));
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = findProductOrThrow(id);
        productVariantRepository.deleteAllByProduct(product);
        productRepository.delete(product);
    }

    // ─── Variant helpers ──────────────────────────────────────────────────────

    private void saveVariants(Product product, List<ProductVariantRequest> requests) {
        for (ProductVariantRequest r : requests) {
            product.getVariants().add(buildVariantEntity(r, product));
        }
    }

    /**
     * Upsert variants:
     * - id có trong request và tồn tại trong DB → update
     * - id null hoặc không tồn tại → create mới
     * - id có trong DB nhưng không có trong request → xóa
     */
    private void upsertVariants(Product product, List<ProductVariantRequest> requests) {
        Map<Long, ProductVariant> existingById = product.getVariants().stream()
                .filter(v -> v.getId() != null)
                .collect(Collectors.toMap(ProductVariant::getId, v -> v));

        Set<Long> incomingIds = requests.stream()
                .filter(r -> r.getId() != null)
                .map(ProductVariantRequest::getId)
                .collect(Collectors.toSet());

        // Xóa những variant không còn trong request
        product.getVariants().removeIf(v -> v.getId() != null && !incomingIds.contains(v.getId()));

        for (ProductVariantRequest r : requests) {
            if (r.getId() != null && existingById.containsKey(r.getId())) {
                applyVariantRequest(existingById.get(r.getId()), r);
            } else {
                product.getVariants().add(buildVariantEntity(r, product));
            }
        }
    }

    private void recalculateStock(Product product) {
        int total = product.getVariants() == null ? 0
                : product.getVariants().stream()
                        .mapToInt(v -> v.getStock() != null ? v.getStock() : 0)
                        .sum();
        product.setStock(total);
    }

    private ProductVariant buildVariantEntity(ProductVariantRequest r, Product product) {
        return ProductVariant.builder()
                .size(r.getSize())
                .colorName(r.getColorName())
                .colorHex(r.getColorHex())
                .stock(r.getStock() != null ? r.getStock() : 0)
                .measurements(buildMeasurementsEntity(r))
                .product(product)
                .build();
    }

    private void applyVariantRequest(ProductVariant variant, ProductVariantRequest r) {
        variant.setSize(r.getSize());
        variant.setColorName(r.getColorName());
        variant.setColorHex(r.getColorHex());
        variant.setStock(r.getStock() != null ? r.getStock() : 0);
        variant.setMeasurements(buildMeasurementsEntity(r));
    }

    private ProductMeasurements buildMeasurementsEntity(ProductVariantRequest r) {
        return productMapper.toMeasurementsEntity(r.getMeasurements());
    }

    // ─── Color helpers ────────────────────────────────────────────────────────

    private List<ColorDto> buildColorList(List<ColorDto> colors) {
        if (colors == null)
            return new ArrayList<>();
        return colors.stream()
                .filter(c -> c != null && c.getName() != null && !c.getName().isBlank())
                .map(c -> ColorDto.builder().name(c.getName()).hex(c.getHex()).build())
                .collect(Collectors.toList());
    }

    // ─── Enum parsing ─────────────────────────────────────────────────────────

    private ProductType parseProductType(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("productType is required");
        }
        try {
            return ProductType.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(
                    "Invalid productType: '" + value + "'. Valid values: TOP, BOTTOM, DRESS, OUTERWEAR");
        }
    }

    private Gender parseGender(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("gender is required");
        }
        try {
            return Gender.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(
                    "Invalid gender: '" + value + "'. Valid values: MALE, FEMALE, UNISEX");
        }
    }

    // ─── Utilities ────────────────────────────────────────────────────────────

    private Product findProductOrThrow(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found: " + id));
    }

    private Category resolveCategoryOrNull(Long categoryId) {
        if (categoryId == null)
            return null;
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found: " + categoryId));
    }
}