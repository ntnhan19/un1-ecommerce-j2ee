// DashboardStatsDto.java
package com.un1.ecommerce.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class DashboardStatsDto {
    private BigDecimal totalRevenue;
    private long totalOrders;
    private long totalProducts;
    private long totalCustomers;
    // Growth fields — tính so tháng trước, để 0 nếu chưa có logic
    private double revenueGrowth;
    private double ordersGrowth;
    private double productsGrowth;
    private double customersGrowth;
}