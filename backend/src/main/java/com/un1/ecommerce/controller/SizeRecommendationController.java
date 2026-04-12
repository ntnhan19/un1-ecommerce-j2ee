package com.un1.ecommerce.controller;

import com.un1.ecommerce.dto.request.SizeRecommendationRequest;
import com.un1.ecommerce.dto.response.SizeRecommendationResponse;
import com.un1.ecommerce.service.SizeRecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/size-recommendations")
@RequiredArgsConstructor
public class SizeRecommendationController {

    private final SizeRecommendationService sizeRecommendationService;

    @PostMapping
    public ResponseEntity<SizeRecommendationResponse> recommend(@Valid @RequestBody SizeRecommendationRequest request) {
        return ResponseEntity.ok(sizeRecommendationService.recommend(request));
    }
}
