package com.un1.ecommerce.service.impl;

import com.un1.ecommerce.dto.response.*;
import com.un1.ecommerce.entity.Order;
import com.un1.ecommerce.entity.OrderItem;
import com.un1.ecommerce.entity.OrderStatus;
import com.un1.ecommerce.repository.*;
import com.un1.ecommerce.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public DashboardStatsDto getOverviewStats() {
        BigDecimal totalRevenue = orderRepository.findAll().stream()
                .filter(o -> o.getStatus() != OrderStatus.CANCELED)
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return DashboardStatsDto.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(orderRepository.count())
                .totalProducts(productRepository.count())
                .totalCustomers(userRepository.count())
                .revenueGrowth(0)
                .ordersGrowth(0)
                .productsGrowth(0)
                .customersGrowth(0)
                .build();
    }

    @Override
    public List<RevenueChartDto> getRevenueChart() {
        List<Order> allOrders = orderRepository.findAll().stream()
                .filter(o -> o.getStatus() != OrderStatus.CANCELED
                        && o.getOrderDate() != null
                        && o.getOrderDate().isAfter(LocalDateTime.now().minusMonths(6)))
                .collect(Collectors.toList());

        // Group by month
        Map<String, List<Order>> byMonth = new LinkedHashMap<>();
        for (int i = 5; i >= 0; i--) {
            String key = LocalDateTime.now().minusMonths(i)
                    .format(DateTimeFormatter.ofPattern("T M/yyyy"));
            byMonth.put(key, new ArrayList<>());
        }

        for (Order o : allOrders) {
            String key = o.getOrderDate().format(DateTimeFormatter.ofPattern("T M/yyyy"));
            byMonth.computeIfPresent(key, (k, list) -> {
                list.add(o);
                return list;
            });
        }

        return byMonth.entrySet().stream()
                .map(e -> RevenueChartDto.builder()
                        .month(e.getKey())
                        .revenue(e.getValue().stream()
                                .map(Order::getTotalAmount)
                                .reduce(BigDecimal.ZERO, BigDecimal::add))
                        .orders(e.getValue().size())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<TopProductDto> getTopProducts() {
        // Tính sold + revenue từ order items của các đơn không bị hủy
        Map<Long, long[]> productStats = new HashMap<>();
        // long[0] = sold, long[1] = revenue (scaled)

        orderRepository.findAll().stream()
                .filter(o -> o.getStatus() != OrderStatus.CANCELED)
                .flatMap(o -> o.getOrderItems().stream())
                .forEach(item -> {
                    Long pid = item.getProduct().getId();
                    productStats.computeIfAbsent(pid, k -> new long[2]);
                    productStats.get(pid)[0] += item.getQuantity();
                    productStats.get(pid)[1] += item.getPrice()
                            .multiply(BigDecimal.valueOf(item.getQuantity()))
                            .longValue();
                });

        return productStats.entrySet().stream()
                .sorted((a, b) -> Long.compare(b.getValue()[0], a.getValue()[0]))
                .limit(5)
                .map(e -> {
                    var product = productRepository.findById(e.getKey()).orElse(null);
                    if (product == null)
                        return null;
                    return TopProductDto.builder()
                            .id(product.getId())
                            .name(product.getName())
                            .categoryName(product.getCategory() != null
                                    ? product.getCategory().getName()
                                    : "")
                            .sold(e.getValue()[0])
                            .revenue(BigDecimal.valueOf(e.getValue()[1]))
                            .build();
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    public List<RecentOrderDto> getRecentOrders() {
        return orderRepository.findAll().stream()
                .filter(o -> o.getOrderDate() != null)
                .sorted(Comparator.comparing(Order::getOrderDate).reversed())
                .limit(5)
                .map(o -> RecentOrderDto.builder()
                        .id(o.getId())
                        .customer(o.getUser().getFullName())
                        .email(o.getUser().getEmail())
                        .date(o.getOrderDate())
                        .total(o.getTotalAmount())
                        .status(o.getStatus().name())
                        .build())
                .collect(Collectors.toList());
    }
}