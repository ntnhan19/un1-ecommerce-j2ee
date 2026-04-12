package com.un1.ecommerce.dto.response;

import com.un1.ecommerce.dto.ColorDto;
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
public class ProductResponse {

    private Long id;
    private String name;
    private BigDecimal price;
    private Integer stock;
    private String description;

    private Long categoryId;
    private String categoryName;

    private List<String> imageUrls;
    private List<ColorDto> colors;
    private List<String> sizes;
    private List<ProductVariantResponse> variants;

    private Boolean featured;

    /**
     * Loại sản phẩm: TOP, BOTTOM, DRESS, OUTERWEAR.
     * Dùng để quyết định bộ measurements nào có ý nghĩa khi tư vấn size.
     */
    private String productType;

    /**
     * Giới tính: MALE, FEMALE, UNISEX.
     * Dùng để estimate body measurements phù hợp.
     */
    private String gender;
}