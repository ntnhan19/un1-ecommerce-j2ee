package com.un1.ecommerce.controller;

import com.un1.ecommerce.dto.request.CartItemRequest;
import com.un1.ecommerce.dto.response.ApiResponse;
import com.un1.ecommerce.dto.response.CartResponse;
import com.un1.ecommerce.entity.User;
import com.un1.ecommerce.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping({"/api/cart", "/api/carts"})
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final com.un1.ecommerce.repository.UserRepository userRepository;

    @PostMapping("/items")
    public ResponseEntity<ApiResponse> addToCart(@Valid @RequestBody CartItemRequest request,
                                                 Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new com.un1.ecommerce.exception.ResourceNotFoundException("User not found"));
        CartResponse cartResponse = cartService.addToCart(request, user);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Item added to cart successfully")
                        .data(cartResponse)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getCart(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new com.un1.ecommerce.exception.ResourceNotFoundException("User not found"));
        CartResponse cartResponse = cartService.getCart(user);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Cart retrieved successfully")
                        .data(cartResponse)
                        .build()
        );
    }
}
