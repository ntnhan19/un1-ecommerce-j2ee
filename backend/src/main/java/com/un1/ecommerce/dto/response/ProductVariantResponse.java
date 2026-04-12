package com.un1.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantResponse {
    private Long id;
    private String size;
    private String colorName;
    private String colorHex;
    private Integer stock;
    private ProductMeasurementsResponse measurements;
}
