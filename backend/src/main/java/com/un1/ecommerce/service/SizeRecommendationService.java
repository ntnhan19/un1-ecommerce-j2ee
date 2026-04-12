package com.un1.ecommerce.service;

import com.un1.ecommerce.dto.request.SizeRecommendationRequest;
import com.un1.ecommerce.dto.response.SizeRecommendationResponse;

public interface SizeRecommendationService {
    SizeRecommendationResponse recommend(SizeRecommendationRequest request);
}
