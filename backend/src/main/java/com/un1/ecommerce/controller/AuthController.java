package com.un1.ecommerce.controller;

import com.un1.ecommerce.config.RequireAdmin;
import com.un1.ecommerce.dto.request.LoginRequest;
import com.un1.ecommerce.dto.request.RegisterRequest;
import com.un1.ecommerce.dto.response.ApiResponse;
import com.un1.ecommerce.dto.response.AuthResponse;
import com.un1.ecommerce.dto.response.UserResponse;
import com.un1.ecommerce.service.impl.AuthenticationService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    /**
     * POST /api/auth/register
     * Validate email/password, hash with bcrypt, create cart, return JWT
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Register request for email: {}", request.getEmail());
        AuthResponse response = authenticationService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * POST /api/auth/login
     * Validate credentials, return JWT with 7-day expiry
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login request for email: {}", request.getEmail());
        AuthResponse response = authenticationService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/auth/logout
     * Client-side token clearing (stateless JWT - no server-side action needed)
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout() {
        log.info("Logout request from user: {}", getCurrentUserEmail());
        
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Logged out successfully. Please clear the token from client-side.")
                .build();
        
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/auth/me
     * Protected route - returns current user info
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        String email = getCurrentUserEmail();
        log.info("Fetching current user info for: {}", email);
        
        UserResponse response = authenticationService.getCurrentUser(email);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/auth/admin/test
     * Protected route - Admin only endpoint (demo requireAdmin)
     */
    @GetMapping("/admin/test")
    @RequireAdmin("Only admins can access this endpoint")
    public ResponseEntity<ApiResponse> adminTestEndpoint() {
        String email = getCurrentUserEmail();
        log.info("Admin endpoint accessed by: {}", email);
        
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .message("Welcome Admin! This is a protected admin-only endpoint.")
                .data("User: " + email)
                .build();
        
        return ResponseEntity.ok(response);
    }

    /**
     * Helper method to get current user email from JWT token
     */
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null ? authentication.getName() : null;
    }
}
