package com.un1.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

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
    private java.util.List<String> imageUrls;
    private java.util.List<String> colors;
    private java.util.List<String> sizes;
}
