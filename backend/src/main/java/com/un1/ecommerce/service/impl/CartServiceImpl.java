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
import java.util.Objects;
import java.util.Optional;
import java.util.List;
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
                    Cart newCart = Cart.builder().user(user).build();
                    return cartRepository.save(newCart);
                });

        String incomingSize = request.getSize() != null ? request.getSize() : "M";
        String incomingColor = request.getColor() != null ? request.getColor() : "Đen";

        // Tìm item trùng productId + size + color (cùng variant mới tính là trùng)
        Optional<CartItem> existingItemOpt = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId())
                        && Objects.equals(item.getSize(), incomingSize)
                        && Objects.equals(item.getColor(), incomingColor))
                .findFirst();

        int newTotalQuantity = request.getQuantity();
        if (existingItemOpt.isPresent()) {
            newTotalQuantity += existingItemOpt.get().getQuantity();
        }

        if (newTotalQuantity > product.getStock()) {
            throw new BadRequestException("Insufficient stock");
        }

        if (existingItemOpt.isPresent()) {
            existingItemOpt.get().setQuantity(newTotalQuantity);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .size(incomingSize)
                    .color(incomingColor)
                    .build();
            cart.getCartItems().add(newItem);
        }

        return mapToResponse(cartRepository.save(cart));
    }

    @Override
    public CartResponse getCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = Cart.builder().user(user).build();
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

    // ── Thêm mới: update số lượng 1 item ──────────────────────────────────────
    @Override
    @Transactional
    public CartResponse updateCartItem(Long cartItemId, Integer quantity, User user) {
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        CartItem item = cart.getCartItems().stream()
                .filter(i -> i.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (quantity <= 0) {
            cart.getCartItems().remove(item);
        } else {
            if (quantity > item.getProduct().getStock()) {
                throw new BadRequestException("Insufficient stock");
            }
            item.setQuantity(quantity);
        }

        return mapToResponse(cartRepository.save(cart));
    }

    // ── Thêm mới: xóa 1 item ──────────────────────────────────────────────────
    @Override
    @Transactional
    public CartResponse removeCartItem(Long cartItemId, User user) {
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        cart.getCartItems().removeIf(i -> i.getId().equals(cartItemId));
        return mapToResponse(cartRepository.save(cart));
    }

    private CartResponse mapToResponse(Cart cart) {
        List<CartResponse.CartItemResponse> itemsRes = cart.getCartItems().stream()
                .map(item -> {
                    BigDecimal subTotal = item.getProduct().getPrice()
                            .multiply(new BigDecimal(item.getQuantity()));

                    // Product có imageUrls (List<String>), lấy ảnh đầu tiên
                    String firstImage = (item.getProduct().getImageUrls() != null
                            && !item.getProduct().getImageUrls().isEmpty())
                                    ? item.getProduct().getImageUrls().get(0)
                                    : null;

                    return CartResponse.CartItemResponse.builder()
                            .id(item.getId())
                            .productId(item.getProduct().getId())
                            .productName(item.getProduct().getName())
                            .productImage(firstImage)
                            .quantity(item.getQuantity())
                            .price(item.getProduct().getPrice())
                            .subTotal(subTotal)
                            .size(item.getSize())
                            .color(item.getColor())
                            .build();
                })
                .collect(Collectors.toList());

        BigDecimal totalAmount = itemsRes.stream()
                .map(CartResponse.CartItemResponse::getSubTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return CartResponse.builder()
                .id(cart.getId())
                .items(itemsRes)
                .totalAmount(totalAmount)
                .build();
    }
}