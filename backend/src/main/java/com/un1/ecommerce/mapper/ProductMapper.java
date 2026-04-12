package com.un1.ecommerce.mapper;

import com.un1.ecommerce.dto.ColorDto;
import com.un1.ecommerce.dto.request.ProductMeasurementsRequest;
import com.un1.ecommerce.dto.request.ProductRequest;
import com.un1.ecommerce.dto.request.ProductVariantRequest;
import com.un1.ecommerce.dto.response.ProductMeasurementsResponse;
import com.un1.ecommerce.dto.response.ProductResponse;
import com.un1.ecommerce.dto.response.ProductVariantResponse;
import com.un1.ecommerce.entity.Gender;
import com.un1.ecommerce.entity.Product;
import com.un1.ecommerce.entity.ProductMeasurements;
import com.un1.ecommerce.entity.ProductType;
import com.un1.ecommerce.entity.ProductVariant;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Single source of truth cho việc chuyển đổi giữa Product entity
 * và các DTO. ProductServiceImpl inject và dùng class này —
 * không còn private toResponse() nào trong service nữa.
 */
@Component
public class ProductMapper {

    // ─── Entity → Response ────────────────────────────────────────────────────

    public ProductResponse toResponse(Product product) {
        if (product == null)
            return null;

        List<ProductVariantResponse> variantResponses = product.getVariants() != null
                ? product.getVariants().stream()
                        .sorted(Comparator.comparing(ProductVariant::getSize)
                                .thenComparing(ProductVariant::getColorName))
                        .map(this::toVariantResponse)
                        .collect(Collectors.toList())
                : new ArrayList<>();

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .stock(resolveStock(product))
                .description(product.getDescription())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .imageUrls(product.getImageUrls() != null ? product.getImageUrls() : new ArrayList<>())
                .colors(extractColors(product))
                .sizes(extractSizes(product))
                .variants(variantResponses)
                .featured(product.getFeatured())
                .productType(product.getProductType() != null ? product.getProductType().name() : null)
                .gender(product.getGender() != null ? product.getGender().name() : null)
                .build();
    }

    // ─── Request → Entity (create) ────────────────────────────────────────────

    /**
     * Tạo Product entity mới từ request. Category, productType và gender
     * được set bởi ProductServiceImpl trước khi save — không set ở đây
     * để tránh circular dependency và đảm bảo validation enum xảy ra tại
     * một chỗ duy nhất.
     */
    public Product toEntity(ProductRequest request) {
        if (request == null)
            return null;

        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .stock(request.getStock() != null ? request.getStock() : 0)
                .description(request.getDescription())
                .imageUrls(request.getImageUrls() != null
                        ? new ArrayList<>(request.getImageUrls())
                        : new ArrayList<>())
                .colors(buildColorList(request.getColors()))
                .sizes(request.getSizes() != null
                        ? new ArrayList<>(request.getSizes())
                        : new ArrayList<>())
                .featured(Boolean.TRUE.equals(request.getFeatured()))
                .build();

        applyVariants(request, product);
        syncProductStock(product);
        return product;
    }

    // ─── Request → Entity (update) ────────────────────────────────────────────

    /**
     * Cập nhật các field của product từ request.
     * Không động đến category, productType, gender — service tự handle.
     */
    public void updateEntityFromRequest(ProductRequest request, Product product) {
        if (request == null || product == null)
            return;

        if (request.getName() != null)
            product.setName(request.getName());
        if (request.getPrice() != null)
            product.setPrice(request.getPrice());
        if (request.getDescription() != null)
            product.setDescription(request.getDescription());

        if (request.getImageUrls() != null) {
            product.getImageUrls().clear();
            product.getImageUrls().addAll(request.getImageUrls());
        }
        if (request.getColors() != null) {
            product.getColors().clear();
            product.getColors().addAll(buildColorList(request.getColors()));
        }
        if (request.getSizes() != null) {
            product.getSizes().clear();
            product.getSizes().addAll(request.getSizes());
        }
        if (request.getFeatured() != null) {
            product.setFeatured(request.getFeatured());
        }
        if (request.getVariants() != null || request.getSizes() != null || request.getColors() != null) {
            applyVariants(request, product);
        }

        syncProductStock(product);
    }

    // ─── Variant mapping ──────────────────────────────────────────────────────

    private void applyVariants(ProductRequest request, Product product) {
        List<ProductVariant> nextVariants = buildVariants(request, product);
        product.getVariants().clear();
        product.getVariants().addAll(nextVariants);
        syncLegacyAttributes(product);
    }

    private List<ProductVariant> buildVariants(ProductRequest request, Product product) {
        List<ProductVariantRequest> variantRequests = request.getVariants();

        if (variantRequests != null && !variantRequests.isEmpty()) {
            return variantRequests.stream()
                    .filter(Objects::nonNull)
                    .map(vr -> toVariantEntity(vr, product))
                    .collect(Collectors.toList());
        }

        // Fallback: cross-product sizes × colors
        List<String> sizes = request.getSizes() != null ? request.getSizes() : new ArrayList<>();
        List<ColorDto> colors = request.getColors() != null ? request.getColors() : new ArrayList<>();

        if (sizes.isEmpty())
            return new ArrayList<>();

        List<ColorDto> resolvedColors = colors.isEmpty()
                ? List.of(ColorDto.builder().name("Default").hex("#111111").build())
                : colors;

        int totalStock = request.getStock() != null ? request.getStock() : 0;
        int variantCount = Math.max(1, sizes.size() * resolvedColors.size());
        int baseStock = totalStock / variantCount;
        int remainder = totalStock % variantCount;

        List<ProductVariant> generated = new ArrayList<>();
        int index = 0;
        for (String size : sizes) {
            for (ColorDto color : resolvedColors) {
                int stock = baseStock + (index < remainder ? 1 : 0);
                generated.add(ProductVariant.builder()
                        .size(size)
                        .colorName(color.getName())
                        .colorHex(color.getHex())
                        .stock(stock)
                        .measurements(ProductMeasurements.builder().build())
                        .product(product)
                        .build());
                index++;
            }
        }
        return generated;
    }

    private ProductVariant toVariantEntity(ProductVariantRequest request, Product product) {
        return ProductVariant.builder()
                .id(request.getId())
                .size(request.getSize())
                .colorName(request.getColorName())
                .colorHex(request.getColorHex())
                .stock(request.getStock() != null ? request.getStock() : 0)
                .measurements(toMeasurementsEntity(request.getMeasurements()))
                .product(product)
                .build();
    }

    public ProductMeasurements toMeasurementsEntity(ProductMeasurementsRequest request) {
        if (request == null)
            return ProductMeasurements.builder().build();
        return ProductMeasurements.builder()
                .chestWidth(request.getChestWidth())
                .shoulderWidth(request.getShoulderWidth())
                .waistWidth(request.getWaistWidth())
                .hipWidth(request.getHipWidth())
                .sleeveLength(request.getSleeveLength())
                .bodyLength(request.getBodyLength())
                .thighWidth(request.getThighWidth())
                .inseam(request.getInseam())
                .build();
    }

    public ProductVariantResponse toVariantResponse(ProductVariant variant) {
        return ProductVariantResponse.builder()
                .id(variant.getId())
                .size(variant.getSize())
                .colorName(variant.getColorName())
                .colorHex(variant.getColorHex())
                .stock(variant.getStock())
                .measurements(toMeasurementsResponse(variant.getMeasurements()))
                .build();
    }

    public ProductMeasurementsResponse toMeasurementsResponse(ProductMeasurements m) {
        if (m == null)
            return ProductMeasurementsResponse.builder().build();
        return ProductMeasurementsResponse.builder()
                .chestWidth(m.getChestWidth())
                .shoulderWidth(m.getShoulderWidth())
                .waistWidth(m.getWaistWidth())
                .hipWidth(m.getHipWidth())
                .sleeveLength(m.getSleeveLength())
                .bodyLength(m.getBodyLength())
                .thighWidth(m.getThighWidth())
                .inseam(m.getInseam())
                .build();
    }

    // ─── Color / size helpers ─────────────────────────────────────────────────

    private List<ColorDto> buildColorList(List<ColorDto> colors) {
        if (colors == null)
            return new ArrayList<>();
        return colors.stream()
                .filter(c -> c != null && c.getName() != null && !c.getName().isBlank())
                .map(c -> ColorDto.builder().name(c.getName()).hex(c.getHex()).build())
                .collect(Collectors.toList());
    }

    private List<ColorDto> extractColors(Product product) {
        Map<String, String> colorMap = new LinkedHashMap<>();
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            product.getVariants().forEach(v -> colorMap.putIfAbsent(v.getColorName(),
                    v.getColorHex() != null ? v.getColorHex() : "#111111"));
        } else if (product.getColors() != null) {
            product.getColors().forEach(c -> colorMap.putIfAbsent(c.getName(),
                    c.getHex() != null ? c.getHex() : "#111111"));
        }
        return colorMap.entrySet().stream()
                .map(e -> ColorDto.builder().name(e.getKey()).hex(e.getValue()).build())
                .collect(Collectors.toList());
    }

    private List<String> extractSizes(Product product) {
        if (product.getVariants() == null || product.getVariants().isEmpty()) {
            return product.getSizes() != null ? new ArrayList<>(product.getSizes()) : new ArrayList<>();
        }
        return product.getVariants().stream()
                .map(ProductVariant::getSize)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
    }

    // ─── Stock helpers ────────────────────────────────────────────────────────

    private void syncProductStock(Product product) {
        product.setStock(resolveStock(product));
    }

    private void syncLegacyAttributes(Product product) {
        product.setSizes(extractSizes(product));
        product.setColors(extractColors(product).stream()
                .map(c -> ColorDto.builder().name(c.getName()).hex(c.getHex()).build())
                .collect(Collectors.toList()));
    }

    private int resolveStock(Product product) {
        if (product.getVariants() == null || product.getVariants().isEmpty()) {
            return product.getStock() != null ? product.getStock() : 0;
        }
        return product.getVariants().stream()
                .map(ProductVariant::getStock)
                .filter(Objects::nonNull)
                .reduce(0, Integer::sum);
    }
}