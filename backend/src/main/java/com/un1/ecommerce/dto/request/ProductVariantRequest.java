package com.un1.ecommerce.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantRequest {

    /**
     * Non-null when updating an existing variant; null when creating a new one.
     */
    private Long id;

    @NotBlank(message = "Variant size cannot be blank")
    private String size;

    @NotBlank(message = "Variant color name cannot be blank")
    private String colorName;

    /**
     * Hex color code, e.g. "#FF5733". Optional but strongly recommended
     * so the frontend can render the color swatch correctly.
     */
    private String colorHex;

    @NotNull(message = "Variant stock is required")
    @Min(value = 0, message = "Variant stock cannot be negative")
    private Integer stock;

    /**
     * Garment measurements in centimetres.
     * Used by SizeRecommendationService to calculate fit scores.
     * All fields are optional — supply as many as available.
     */
    @Valid
    private ProductMeasurementsRequest measurements;
}