package com.un1.ecommerce.service.impl;

import com.un1.ecommerce.dto.request.LoginRequest;
import com.un1.ecommerce.dto.request.RegisterRequest;
import com.un1.ecommerce.dto.response.AuthResponse;
import com.un1.ecommerce.dto.response.UserResponse;
import com.un1.ecommerce.entity.Cart;
import com.un1.ecommerce.entity.Role;
import com.un1.ecommerce.entity.User;
import com.un1.ecommerce.exception.ResourceNotFoundException;
import com.un1.ecommerce.repository.CartRepository;
import com.un1.ecommerce.repository.RoleRepository;
import com.un1.ecommerce.repository.UserRepository;
import com.un1.ecommerce.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Register a new user
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        log.info("Registering new user with email: {}", request.getEmail());

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("Email already exists: {}", request.getEmail());
            throw new IllegalArgumentException("Email already exists");
        }

        // Create new user
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .build();

        // Assign default USER role
        Role userRole = roleRepository.findByName("USER")
                .orElseGet(() -> {
                    Role newRole = Role.builder().name("USER").build();
                    return roleRepository.save(newRole);
                });

        user.getRoles().add(userRole);

        // Save user
        User savedUser = userRepository.save(user);
        log.info("User registered successfully with id: {}", savedUser.getId());

        // Create cart for new user
        Cart cart = Cart.builder()
                .user(savedUser)
                .items(new ArrayList<>())
                .build();
        cartRepository.save(cart);
        log.info("Cart created for user id: {}", savedUser.getId());

        // Generate token
        String token = jwtUtil.generateToken(savedUser.getEmail());

        // Return auth response
        UserResponse userResponse = mapToUserResponse(savedUser);
        return AuthResponse.builder()
                .token(token)
                .user(userResponse)
                .build();
    }

    /**
     * Login user
     */
    public AuthResponse login(LoginRequest request) {
        log.info("Authenticating user with email: {}", request.getEmail());

        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.warn("User not found with email: {}", request.getEmail());
                    return new ResourceNotFoundException("Invalid email or password");
                });

        // Validate password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Invalid password for user: {}", request.getEmail());
            throw new ResourceNotFoundException("Invalid email or password");
        }

        log.info("User authenticated successfully: {}", request.getEmail());

        // Generate token
        String token = jwtUtil.generateToken(user.getEmail());

        // Return auth response
        UserResponse userResponse = mapToUserResponse(user);
        return AuthResponse.builder()
                .token(token)
                .user(userResponse)
                .build();
    }

    /**
     * Get current user by email
     */
    public UserResponse getCurrentUser(String email) {
        log.info("Fetching current user: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("User not found with email: {}", email);
                    return new ResourceNotFoundException("User not found");
                });

        return mapToUserResponse(user);
    }

    /**
     * Map User entity to UserResponse DTO
     */
    private UserResponse mapToUserResponse(User user) {
        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .roles(roleNames)
                .createdAt(user.getCreatedAt())
                .build();
    }

    /**
     * Check if user is admin
     */
    public boolean isAdmin(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return user.getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.getName()));
    }
}
