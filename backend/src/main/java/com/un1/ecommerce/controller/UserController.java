package com.un1.ecommerce.controller;

import com.un1.ecommerce.dto.request.ChangePasswordRequest;
import com.un1.ecommerce.dto.request.ShippingAddressRequest;
import com.un1.ecommerce.dto.request.UpdateProfileRequest;
import com.un1.ecommerce.dto.response.ApiResponse;
import com.un1.ecommerce.dto.response.ShippingAddressResponse;
import com.un1.ecommerce.dto.response.UserResponse;
import com.un1.ecommerce.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/me")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<UserResponse> getCurrentUserProfile() {
        return ResponseEntity.ok(userService.getCurrentUserProfile(getCurrentUserEmail()));
    }

    @PutMapping
    public ResponseEntity<UserResponse> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(userService.updateProfile(getCurrentUserEmail(), request));
    }

    @PutMapping("/password")
    public ResponseEntity<ApiResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        userService.changePassword(getCurrentUserEmail(), request);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Đổi mật khẩu thành công")
                .build());
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<ShippingAddressResponse>> getShippingAddresses() {
        return ResponseEntity.ok(userService.getShippingAddresses(getCurrentUserEmail()));
    }

    @PostMapping("/addresses")
    public ResponseEntity<ShippingAddressResponse> addShippingAddress(@Valid @RequestBody ShippingAddressRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.addShippingAddress(getCurrentUserEmail(), request));
    }

    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<ShippingAddressResponse> updateShippingAddress(
            @PathVariable Long addressId,
            @Valid @RequestBody ShippingAddressRequest request) {
        return ResponseEntity.ok(userService.updateShippingAddress(getCurrentUserEmail(), addressId, request));
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<ApiResponse> deleteShippingAddress(@PathVariable Long addressId) {
        userService.deleteShippingAddress(getCurrentUserEmail(), addressId);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Xóa địa chỉ thành công")
                .build());
    }

    @PatchMapping("/addresses/{addressId}/default")
    public ResponseEntity<ShippingAddressResponse> setDefaultShippingAddress(@PathVariable Long addressId) {
        return ResponseEntity.ok(userService.setDefaultShippingAddress(getCurrentUserEmail(), addressId));
    }

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null ? authentication.getName() : null;
    }
}
