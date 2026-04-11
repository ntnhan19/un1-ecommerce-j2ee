package com.un1.ecommerce.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.un1.ecommerce.dto.request.GoogleOAuthRequest;
import com.un1.ecommerce.dto.response.AuthResponse;
import com.un1.ecommerce.dto.response.UserResponse;
import com.un1.ecommerce.entity.Cart;
import com.un1.ecommerce.entity.Role;
import com.un1.ecommerce.entity.User;
import com.un1.ecommerce.exception.UnauthorizedException;
import com.un1.ecommerce.repository.CartRepository;
import com.un1.ecommerce.repository.RoleRepository;
import com.un1.ecommerce.repository.UserRepository;
import com.un1.ecommerce.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class GoogleAuthService {

    @Value("${app.google.client-id}")
    private String googleClientId;

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

    @Transactional
    public AuthResponse authenticate(GoogleOAuthRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getIdToken());
            if (idToken == null) {
                log.error("Invalid ID token.");
                throw new UnauthorizedException("Google token không hợp lệ.");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            log.info("Google User Info - Email: {}, Name: {}", email, name);

            Optional<User> userOptional = userRepository.findByEmail(email);
            User user;

            if (userOptional.isPresent()) {
                user = userOptional.get();
                if (user.getAuthProvider() == null || user.getAuthProvider().isBlank()) {
                    user.setAuthProvider(Boolean.TRUE.equals(user.getPasswordLoginEnabled()) ? "LOCAL" : "GOOGLE");
                }
                log.info("Existing user logged in via Google: {}", email);
            } else {
                log.info("Registering new user from Google: {}", email);
                String uniquePassword = UUID.randomUUID().toString() + UUID.randomUUID().toString();

                user = User.builder()
                        .email(email)
                        .fullName(name)
                        .password(passwordEncoder.encode(uniquePassword))
                        .authProvider("GOOGLE")
                        .passwordLoginEnabled(false)
                        .roles(new HashSet<>())
                        .build();

                user.getRoles().add(getOrCreateRole("ROLE_USER"));
                user = userRepository.save(user);

                Cart cart = Cart.builder()
                        .user(user)
                        .cartItems(new ArrayList<>())
                        .build();
                cartRepository.save(cart);
            }

            return createAuthResponse(user);

        } catch (Exception e) {
            log.error("Error during Google Authentication: ", e);
            throw new UnauthorizedException("Đăng nhập Google thất bại.");
        }
    }

    private Role getOrCreateRole(String roleName) {
        return roleRepository.findByName(roleName)
                .orElseGet(() -> roleRepository.save(Role.builder().name(roleName).build()));
    }

    private AuthResponse createAuthResponse(User user) {
        String token = jwtUtil.generateToken(user.getEmail());
        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .authProvider(resolveAuthProvider(user))
                .passwordLoginEnabled(isPasswordLoginEnabled(user))
                .roles(roleNames)
                .createdAt(user.getCreatedAt())
                .build();

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .user(userResponse)
                .build();
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
