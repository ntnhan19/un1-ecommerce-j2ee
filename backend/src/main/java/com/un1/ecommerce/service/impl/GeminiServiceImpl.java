package com.un1.ecommerce.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiServiceImpl {

    @Value("${google.gemini.api-key}")
    private String apiKey;

    @Value("${google.gemini.api-url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public String generateFashionAdvice(String prompt) {
        String requestUrl = apiUrl + "?key=" + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Build payload theo chuẩn của Gemini API
        Map<String, Object> parts = Map.of("text", prompt);
        Map<String, Object> contents = Map.of("parts", List.of(parts));
        Map<String, Object> requestBody = Map.of("contents", List.of(contents));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            Map<String, Object> response = restTemplate.postForObject(requestUrl, request, Map.class);

            // Parse JSON response lấy text
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            List<Map<String, Object>> resParts = (List<Map<String, Object>>) content.get("parts");
            return (String) resParts.get(0).get("text");

        } catch (Exception e) {
            System.err.println("Lỗi gọi Gemini API: " + e.getMessage());
            return null;
        }
    }
}