package com.un1.ecommerce.dto.response;

import com.un1.ecommerce.entity.Order;
import com.un1.ecommerce.entity.OrderStatus;
import com.un1.ecommerce.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private String address; // ← thêm
    private String phone; // ← thêm
    private UserInfo user; // ← thêm để frontend lấy tên/email
    private List<OrderItemResponse> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserInfo {
        private Long id;
        private String email;
        private String name; // fullName hoặc username
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private Integer quantity;
        private BigDecimal price;
    }

    public static OrderResponse fromEntity(Order order) {
        List<OrderItemResponse> itemResponses = order.getOrderItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .build())
                .collect(Collectors.toList());

        User u = order.getUser();
        UserInfo userInfo = UserInfo.builder()
                .id(u.getId())
                .email(u.getEmail())
                // Điều chỉnh theo field thực tế:
                .name(u.getFullName() != null ? u.getFullName() : u.getEmail())
                .build();

        return OrderResponse.builder()
                .id(order.getId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .address(order.getAddress())
                .phone(order.getPhone())
                .user(userInfo)
                .items(itemResponses)
                .build();
    }
}