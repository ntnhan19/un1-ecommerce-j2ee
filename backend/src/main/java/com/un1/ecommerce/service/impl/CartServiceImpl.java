package com.un1.ecommerce.service.impl;

import com.un1.ecommerce.dto.request.CartItemRequest;
import com.un1.ecommerce.dto.response.CartResponse;
import com.un1.ecommerce.entity.Cart;
import com.un1.ecommerce.entity.CartItem;
import com.un1.ecommerce.entity.Product;
import com.un1.ecommerce.entity.User;
import com.un1.ecommerce.exception.BadRequestException;
import com.un1.ecommerce.exception.ResourceNotFoundException;
import com.un1.ecommerce.repository.CartRepository;
import com.un1.ecommerce.repository.ProductRepository;
import com.un1.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public CartResponse addToCart(CartItemRequest request, User user) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        // Check if item already exists in cart
        Optional<CartItem> existingItemOpt = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst();

        int newTotalQuantity = request.getQuantity();
        if (existingItemOpt.isPresent()) {
            newTotalQuantity += existingItemOpt.get().getQuantity();
        }

        // CRITICAL: Stock check limit
        if (newTotalQuantity > product.getStock()) {
            throw new BadRequestException("Insufficient stock");
        }

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            existingItem.setQuantity(newTotalQuantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(request.getQuantity());
            cart.getCartItems().add(newItem);
        }

        Cart savedCart = cartRepository.save(cart);
        return mapToResponse(savedCart);
    }

    @Override
    public CartResponse getCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
        return mapToResponse(cart);
    }

    @Override
    @Transactional
    public void clearCart(User user) {
        cartRepository.findByUserId(user.getId()).ifPresent(cart -> {
            cart.getCartItems().clear();
            cartRepository.save(cart);
        });
    }

    private CartResponse mapToResponse(Cart cart) {
        BigDecimal totalAmount = BigDecimal.ZERO;

        var itemsRes = cart.getCartItems().stream().map(item -> {
            BigDecimal subTotal = item.getProduct().getPrice().multiply(new BigDecimal(item.getQuantity()));
            return CartResponse.CartItemResponse.builder()
                    .id(item.getId())
                    .productId(item.getProduct().getId())
                    .productName(item.getProduct().getName())
                    .quantity(item.getQuantity())
                    .price(item.getProduct().getPrice())
                    .subTotal(subTotal)
                    .build();
        }).collect(Collectors.toList());

        for (var item : itemsRes) {
            totalAmount = totalAmount.add(item.getSubTotal());
        }

        return CartResponse.builder()
                .id(cart.getId())
                .items(itemsRes)
                .totalAmount(totalAmount)
                .build();
    }
}
