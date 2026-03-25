package com.un1.ecommerce.service;

import com.un1.ecommerce.dto.request.CartItemRequest;
import com.un1.ecommerce.dto.response.CartResponse;
import com.un1.ecommerce.entity.User;

public interface CartService {
    CartResponse addToCart(CartItemRequest request, User user);
    CartResponse getCart(User user);
    void clearCart(User user);
}
