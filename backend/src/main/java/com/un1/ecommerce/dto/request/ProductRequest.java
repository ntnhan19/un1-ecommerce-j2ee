package com.un1.ecommerce.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
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

    private java.util.List<String> imageUrls;
    private java.util.List<com.un1.ecommerce.dto.ColorDto> colors;
    private java.util.List<String> sizes;
    private Boolean featured;
}
