package com.un1.ecommerce.service;

import com.un1.ecommerce.dto.request.RegisterRequest;
import com.un1.ecommerce.dto.response.AuthResponse;

public interface UserService {
    AuthResponse register(RegisterRequest request);
    long countTotalUsers();
    java.util.List<com.un1.ecommerce.dto.response.UserResponse> getAllUsers();
}
