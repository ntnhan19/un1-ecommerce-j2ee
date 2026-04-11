package com.un1.ecommerce.service.impl;

import com.un1.ecommerce.dto.request.LoginRequest;
import com.un1.ecommerce.dto.response.AuthResponse;
import com.un1.ecommerce.dto.response.UserResponse;
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

import java.util.Set;
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

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Email hoặc mật khẩu không đúng"));

        if (!isPasswordLoginEnabled(user)) {
            throw new UnauthorizedException("Tài khoản này đang đăng nhập bằng Google. Hãy thiết lập mật khẩu trước trong trang hồ sơ.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Email hoặc mật khẩu không đúng");
        }

        return createAuthResponse(user);
    }

    private AuthResponse createAuthResponse(User user) {
        String token = jwtUtil.generateToken(user.getEmail());
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
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
                .phone(user.getPhone())
                .authProvider(resolveAuthProvider(user))
                .passwordLoginEnabled(isPasswordLoginEnabled(user))
                .roles(roleNames)
                .createdAt(user.getCreatedAt())
                .build();
    }

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

    private boolean isPasswordLoginEnabled(User user) {
        return user.getPasswordLoginEnabled() == null || Boolean.TRUE.equals(user.getPasswordLoginEnabled());
    }

    private String resolveAuthProvider(User user) {
        return user.getAuthProvider() == null || user.getAuthProvider().isBlank()
                ? "LOCAL"
                : user.getAuthProvider();
    }
}
