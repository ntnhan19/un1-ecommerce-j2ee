package com.un1.ecommerce.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
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
public class SizeRecommendationRequest {

    @NotNull(message = "Product id is required")
    private Long productId;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotNull(message = "Height is required")
    @DecimalMin(value = "120.0", message = "Height must be at least 120 cm")
    @DecimalMax(value = "230.0", message = "Height must be at most 230 cm")
    private Double height;

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "30.0", message = "Weight must be at least 30 kg")
    @DecimalMax(value = "200.0", message = "Weight must be at most 200 kg")
    private Double weight;

    @NotNull(message = "Age is required")
    @Min(value = 10, message = "Age must be at least 10")
    @Max(value = 100, message = "Age must be at most 100")
    private Integer age;

    @Builder.Default
    @Min(value = 0, message = "Fit preference must be between 0 and 4")
    @Max(value = 4, message = "Fit preference must be between 0 and 4")
    private Integer fitPreference = 2;

    // ─── Optional ─────────────────────────────────────────────────────────────

    @DecimalMin(value = "20.0", message = "Shoulder must be at least 20 cm")
    @DecimalMax(value = "80.0", message = "Shoulder must be at most 80 cm")
    private Double shoulder;

    @DecimalMin(value = "50.0", message = "Chest must be at least 50 cm")
    @DecimalMax(value = "200.0", message = "Chest must be at most 200 cm")
    private Double chest;

    @DecimalMin(value = "40.0", message = "Waist must be at least 40 cm")
    @DecimalMax(value = "200.0", message = "Waist must be at most 200 cm")
    private Double waist;

    @DecimalMin(value = "50.0", message = "Hips must be at least 50 cm")
    @DecimalMax(value = "200.0", message = "Hips must be at most 200 cm")
    private Double hips;

    @DecimalMin(value = "30.0", message = "Thigh must be at least 30 cm")
    @DecimalMax(value = "120.0", message = "Thigh must be at most 120 cm")
    private Double thigh;

    @DecimalMin(value = "40.0", message = "Inseam must be at least 40 cm")
    @DecimalMax(value = "120.0", message = "Inseam must be at most 120 cm")
    private Double inseam;
}