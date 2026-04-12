package com.un1.ecommerce.service;

import com.un1.ecommerce.dto.response.*;
import java.util.List;

public interface DashboardService {
    DashboardStatsDto getOverviewStats();

    List<RevenueChartDto> getRevenueChart();

    List<TopProductDto> getTopProducts();

    List<RecentOrderDto> getRecentOrders();
}