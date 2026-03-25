package com.un1.ecommerce.controller;

import com.un1.ecommerce.dto.request.OrderRequest;
import com.un1.ecommerce.dto.response.ApiResponse;
import com.un1.ecommerce.dto.response.OrderResponse;
import com.un1.ecommerce.entity.OrderStatus;
import com.un1.ecommerce.entity.User;
import com.un1.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

        private final OrderService orderService;
        private final com.un1.ecommerce.repository.UserRepository userRepository;

        @PostMapping
        public ResponseEntity<ApiResponse> createOrder(@Valid @RequestBody OrderRequest request,
                        Principal principal) {
                User user = userRepository.findByEmail(principal.getName())
                                .orElseThrow(() -> new com.un1.ecommerce.exception.ResourceNotFoundException(
                                                "User not found"));
                OrderResponse orderResponse = orderService.createOrder(request, user);
                return ResponseEntity.status(HttpStatus.CREATED).body(
                                ApiResponse.builder()
                                                .success(true)
                                                .message("Order created successfully")
                                                .data(orderResponse)
                                                .build());
        }

        @GetMapping("/my")
        public ResponseEntity<ApiResponse> getUserOrders(Principal principal) {
                User user = userRepository.findByEmail(principal.getName())
                                .orElseThrow(() -> new com.un1.ecommerce.exception.ResourceNotFoundException(
                                                "User not found"));
                List<OrderResponse> orders = orderService.getUserOrders(user);
                return ResponseEntity.ok(
                                ApiResponse.builder()
                                                .success(true)
                                                .message("User orders retrieved successfully")
                                                .data(orders)
                                                .build());
        }

        @PutMapping("/{id}/status")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<ApiResponse> updateOrderStatus(@PathVariable Long id,
                        @RequestParam OrderStatus status) {
                OrderResponse orderResponse = orderService.updateStatus(id, status);
                return ResponseEntity.ok(
                                ApiResponse.builder()
                                                .success(true)
                                                .message("Order status updated successfully")
                                                .data(orderResponse)
                                                .build());
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse> cancelOrder(@PathVariable Long id,
                        Principal principal) {
                User user = userRepository.findByEmail(principal.getName())
                                .orElseThrow(() -> new com.un1.ecommerce.exception.ResourceNotFoundException(
                                                "User not found"));
                OrderResponse orderResponse = orderService.cancelOrder(id, user);
                return ResponseEntity.ok(
                                ApiResponse.builder()
                                                .success(true)
                                                .message("Order canceled successfully")
                                                .data(orderResponse)
                                                .build());
        }
}
