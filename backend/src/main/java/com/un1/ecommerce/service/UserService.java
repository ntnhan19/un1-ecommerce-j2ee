package com.un1.ecommerce.service;

import com.un1.ecommerce.dto.request.RegisterRequest;
import com.un1.ecommerce.dto.request.ChangePasswordRequest;
import com.un1.ecommerce.dto.request.ShippingAddressRequest;
import com.un1.ecommerce.dto.request.UpdateProfileRequest;
import com.un1.ecommerce.dto.response.AuthResponse;
import com.un1.ecommerce.dto.response.ShippingAddressResponse;
import com.un1.ecommerce.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    AuthResponse register(RegisterRequest request);
    long countTotalUsers();
    List<UserResponse> getAllUsers();
    UserResponse getCurrentUserProfile(String email);
    UserResponse updateProfile(String email, UpdateProfileRequest request);
    void changePassword(String email, ChangePasswordRequest request);
    List<ShippingAddressResponse> getShippingAddresses(String email);
    ShippingAddressResponse addShippingAddress(String email, ShippingAddressRequest request);
    ShippingAddressResponse updateShippingAddress(String email, Long addressId, ShippingAddressRequest request);
    void deleteShippingAddress(String email, Long addressId);
    ShippingAddressResponse setDefaultShippingAddress(String email, Long addressId);
}
