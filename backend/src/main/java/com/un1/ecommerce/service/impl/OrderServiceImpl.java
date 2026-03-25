package com.un1.ecommerce.service.impl;

import com.un1.ecommerce.dto.OrderItemDTO;
import com.un1.ecommerce.dto.OrderRequest;
import com.un1.ecommerce.dto.OrderResponse;
import com.un1.ecommerce.entity.*;
import com.un1.ecommerce.exception.BadRequestException;
import com.un1.ecommerce.exception.ResourceNotFoundException;
import com.un1.ecommerce.repository.OrderItemRepository;
import com.un1.ecommerce.repository.OrderRepository;
import com.un1.ecommerce.repository.ProductRepository;
import com.un1.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final com.un1.ecommerce.repository.CartRepository cartRepository;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request, User user) {
        Order order = new Order();
        order.setUser(user);
        order.setAddress(request.getAddress());
        order.setPhone(request.getPhone());
        order.setStatus(OrderStatus.PENDING);

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BadRequestException("Cart empty"));

        if (cart.getCartItems().isEmpty()) {
            throw new BadRequestException("Cart empty");
        }

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getCartItems()) {
            Product product = cartItem.getProduct();

            if (product.getStock() < cartItem.getQuantity()) {
                throw new BadRequestException("Insufficient stock");
            }

            // Deduct stock
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice());

            totalAmount = totalAmount.add(product.getPrice().multiply(new BigDecimal(cartItem.getQuantity())));
            orderItems.add(orderItem);
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        orderItemRepository.saveAll(orderItems);

        // Clear cart
        cart.getCartItems().clear();
        cartRepository.save(cart);

        return OrderResponse.fromEntity(savedOrder);
    }

    @Override
    public List<OrderResponse> getUserOrders(User user) {
        List<Order> orders = orderRepository.findByUserId(user.getId());
        return orders.stream()
                .map(OrderResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderId));
        order.setStatus(status);
        Order savedOrder = orderRepository.save(order);
        return OrderResponse.fromEntity(savedOrder);
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(Long orderId, User user) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderId));

        boolean isAdmin = user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"));
        if (!order.getUser().getId().equals(user.getId()) && !isAdmin) {
            throw new com.un1.ecommerce.exception.ForbiddenException("You do not have permission to cancel this order");
        }

        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new BadRequestException("Cannot cancel a delivered order");
        }

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("Cannot cancel order in its current status");
        }

        order.setStatus(OrderStatus.CANCELED);

        // Restore stock
        for (OrderItem item : order.getOrderItems()) {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
            productRepository.save(product);
        }

        Order savedOrder = orderRepository.save(order);
        return OrderResponse.fromEntity(savedOrder);
    }
}
