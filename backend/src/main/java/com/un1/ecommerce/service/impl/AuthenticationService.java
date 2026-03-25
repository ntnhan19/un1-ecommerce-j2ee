package com.un1.ecommerce.service.impl;

import com.un1.ecommerce.dto.request.LoginRequest;
import com.un1.ecommerce.dto.request.RegisterRequest;
import com.un1.ecommerce.dto.response.AuthResponse;
import com.un1.ecommerce.dto.response.UserResponse;
import com.un1.ecommerce.entity.Cart;
import com.un1.ecommerce.entity.Role;
import com.un1.ecommerce.entity.User;
import com.un1.ecommerce.exception.ResourceNotFoundException;
import com.un1.ecommerce.exception.UnauthorizedException;
import com.un1.ecommerce.repository.CartRepository;
import com.un1.ecommerce.repository.RoleRepository;
import com.un1.ecommerce.repository.UserRepository;
import com.un1.ecommerce.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@SuppressWarnings("null")
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Registration logic moved to UserServiceImpl using UserService interface

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Email hoặc mật khẩu không đúng"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Email hoặc mật khẩu không đúng");
        }

        return createAuthResponse(user);
    }

    // --- HÀM HELPER ĐỂ TỐI ƯU CODE ---

    private Role getOrCreateRole(String roleName) {
        return roleRepository.findByName(roleName)
                .orElseGet(() -> roleRepository.save(Role.builder().name(roleName).build()));
    }

    private AuthResponse createAuthResponse(User user) {
        String token = jwtUtil.generateToken(user.getEmail());
        return AuthResponse.builder()
                .token(token)
                .type("Bearer") // Sửa lỗi "type: null" trên Postman lúc nãy ở đây!
                .user(mapToUserResponse(user))
                .build();
    }

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
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));

        return user.getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.getName()));
    }

    public UserResponse getCurrentUser(String email) {
        log.info("Fetching current user info for: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("User not found with email: {}", email);
                    return new ResourceNotFoundException("Không tìm thấy người dùng");
                });

        return mapToUserResponse(user);
    }

}
