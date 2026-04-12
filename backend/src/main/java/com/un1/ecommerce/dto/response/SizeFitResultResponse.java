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
public class SizeFitResultResponse {
    private Long variantId;
    private String size;
    private String colorName;
    private Integer score;
    private String overallFit;
    private String summary;
    private List<FitDetailResponse> details;
}
