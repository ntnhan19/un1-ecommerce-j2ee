package com.un1.ecommerce.service;

import com.un1.ecommerce.dto.OrderRequest;
import com.un1.ecommerce.dto.OrderResponse;
import com.un1.ecommerce.entity.OrderStatus;
import com.un1.ecommerce.entity.User;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request, User user);
    List<OrderResponse> getUserOrders(User user);
    OrderResponse updateStatus(Long orderId, OrderStatus status);
    OrderResponse cancelOrder(Long orderId, User user);
}
