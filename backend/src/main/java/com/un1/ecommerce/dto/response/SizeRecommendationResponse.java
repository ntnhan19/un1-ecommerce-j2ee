package com.un1.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SizeRecommendationResponse {
    private Long productId;
    private String productName;
    private String recommendedSize;
    private String recommendationSummary;
    private String productType;
    private BodyMeasurementsResponse estimatedMeasurements;
    private List<SizeFitResultResponse> allSizeResults;
}
