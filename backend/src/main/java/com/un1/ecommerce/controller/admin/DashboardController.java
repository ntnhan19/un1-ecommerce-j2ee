package com.un1.ecommerce.controller.admin;

import com.un1.ecommerce.dto.response.ApiResponse;
import com.un1.ecommerce.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse> getOverviewStats() {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .data(dashboardService.getOverviewStats())
                .build());
    }

    @GetMapping("/revenue-chart")
    public ResponseEntity<ApiResponse> getRevenueChart() {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .data(dashboardService.getRevenueChart())
                .build());
    }

    @GetMapping("/top-products")
    public ResponseEntity<ApiResponse> getTopProducts() {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .data(dashboardService.getTopProducts())
                .build());
    }

    @GetMapping("/recent-orders")
    public ResponseEntity<ApiResponse> getRecentOrders() {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .data(dashboardService.getRecentOrders())
                .build());
    }
}