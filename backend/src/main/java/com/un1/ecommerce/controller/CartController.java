package com.un1.ecommerce.controller;

import com.un1.ecommerce.dto.request.CartItemRequest;
import com.un1.ecommerce.dto.response.ApiResponse;
import com.un1.ecommerce.dto.response.CartResponse;
import com.un1.ecommerce.entity.User;
import com.un1.ecommerce.exception.ResourceNotFoundException;
import com.un1.ecommerce.repository.UserRepository;
import com.un1.ecommerce.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping({ "/api/cart", "/api/carts" })
@RequiredArgsConstructor
public class CartController {

        private final CartService cartService;
        private final UserRepository userRepository;

        private User resolveUser(Principal principal) {
                return userRepository.findByEmail(principal.getName())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        }

        @PostMapping("/items")
        public ResponseEntity<ApiResponse> addToCart(@Valid @RequestBody CartItemRequest request,
                        Principal principal) {
                CartResponse cartResponse = cartService.addToCart(request, resolveUser(principal));
                return ResponseEntity.ok(ApiResponse.builder()
                                .success(true)
                                .message("Item added to cart successfully")
                                .data(cartResponse)
                                .build());
        }

        @GetMapping
        public ResponseEntity<ApiResponse> getCart(Principal principal) {
                CartResponse cartResponse = cartService.getCart(resolveUser(principal));
                return ResponseEntity.ok(ApiResponse.builder()
                                .success(true)
                                .message("Cart retrieved successfully")
                                .data(cartResponse)
                                .build());
        }

        // PATCH /api/cart/items/{id} body: { "quantity": 3 }
        @PatchMapping("/items/{id}")
        public ResponseEntity<ApiResponse> updateItem(@PathVariable Long id,
                        @RequestBody Map<String, Integer> body,
                        Principal principal) {
                Integer quantity = body.get("quantity");
                CartResponse cartResponse = cartService.updateCartItem(id, quantity, resolveUser(principal));
                return ResponseEntity.ok(ApiResponse.builder()
                                .success(true)
                                .message("Cart item updated")
                                .data(cartResponse)
                                .build());
        }

        // DELETE /api/cart/items/{id}
        @DeleteMapping("/items/{id}")
        public ResponseEntity<ApiResponse> removeItem(@PathVariable Long id,
                        Principal principal) {
                CartResponse cartResponse = cartService.removeCartItem(id, resolveUser(principal));
                return ResponseEntity.ok(ApiResponse.builder()
                                .success(true)
                                .message("Cart item removed")
                                .data(cartResponse)
                                .build());
        }
}