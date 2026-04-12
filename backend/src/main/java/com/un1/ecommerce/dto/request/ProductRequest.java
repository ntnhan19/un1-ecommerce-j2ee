package com.un1.ecommerce.dto.request;

import com.un1.ecommerce.dto.ColorDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {

    @NotBlank(message = "Product name cannot be blank")
    private String name;

    @NotNull(message = "Price cannot be null")
    @Min(value = 0, message = "Price cannot be negative")
    private BigDecimal price;

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer stock;

    private String description;

    private Long categoryId;

    /**
     * Product-level image URLs.
     * Submitted as imageUrls[0], imageUrls[1], ... from the admin form.
     */
    private List<String> imageUrls;

    /**
     * Derived color list (name + hex).
     * Submitted as colors[0].name, colors[0].hex, ...
     * If omitted, AdminController derives this from variants.
     */
    private List<ColorDto> colors;

    /**
     * Derived size list.
     * Submitted as sizes[0], sizes[1], ...
     * If omitted, AdminController derives this from variants.
     */
    private List<String> sizes;

    /**
     * Per-variant data: each entry represents one (color × size) combination
     * with its own stock and garment measurements for AI size recommendations.
     * Submitted as variants[i].size, variants[i].colorName, variants[i].stock,
     * variants[i].measurements.chestWidth, etc.
     */
    @Valid
    private List<ProductVariantRequest> variants;

    private Boolean featured;

    @NotNull(message = "Product type is required")
    private String productType;

    @NotNull(message = "Gender is required")
    private String gender;
}