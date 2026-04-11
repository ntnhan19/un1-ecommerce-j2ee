package com.un1.ecommerce.service.impl;

import com.un1.ecommerce.dto.request.RegisterRequest;
import com.un1.ecommerce.dto.request.ChangePasswordRequest;
import com.un1.ecommerce.dto.request.ShippingAddressRequest;
import com.un1.ecommerce.dto.request.UpdateProfileRequest;
import com.un1.ecommerce.dto.response.AuthResponse;
import com.un1.ecommerce.dto.response.ShippingAddressResponse;
import com.un1.ecommerce.dto.response.UserResponse;
import com.un1.ecommerce.entity.Cart;
import com.un1.ecommerce.entity.Role;
import com.un1.ecommerce.entity.ShippingAddress;
import com.un1.ecommerce.entity.User;
import com.un1.ecommerce.exception.BadRequestException;
import com.un1.ecommerce.exception.ResourceNotFoundException;
import com.un1.ecommerce.repository.CartRepository;
import com.un1.ecommerce.repository.RoleRepository;
import com.un1.ecommerce.repository.ShippingAddressRepository;
import com.un1.ecommerce.repository.UserRepository;
import com.un1.ecommerce.service.UserService;
import com.un1.ecommerce.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ShippingAddressRepository shippingAddressRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Transactional
    @Override
    public AuthResponse register(RegisterRequest request) {
        String processedEmail = request.getEmail().trim().toLowerCase();
        log.info("Registering new user with email: {}", processedEmail);

        if (userRepository.existsByEmail(processedEmail)) {
            throw new IllegalArgumentException("Email đã tồn tại");
        }

        User user = User.builder()
                .email(processedEmail)
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .authProvider("LOCAL")
                .passwordLoginEnabled(true)
                .roles(new HashSet<>())
                .build();

        user.getRoles().add(getOrCreateRole("ROLE_USER"));
        User savedUser = userRepository.save(user);

        Cart cart = Cart.builder()
                .user(savedUser)
                .cartItems(new ArrayList<>())
                .build();
        cartRepository.save(cart);

        return createAuthResponse(savedUser);
    }

    private Role getOrCreateRole(String roleName) {
        return roleRepository.findByName(roleName)
                .orElseGet(() -> roleRepository.save(Role.builder().name(roleName).build()));
    }

    @Override
    public long countTotalUsers() {
        return userRepository.count();
    }

    @Override
    public java.util.List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getCurrentUserProfile(String email) {
        return mapToUserResponse(getUserByEmail(email));
    }

    @Override
    @Transactional
    public UserResponse updateProfile(String email, UpdateProfileRequest request) {
        User user = getUserByEmail(email);
        user.setFullName(request.getFullName().trim());
        user.setPhone(normalizePhone(request.getPhone()));
        return mapToUserResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    public void changePassword(String email, ChangePasswordRequest request) {
        User user = getUserByEmail(email);

        boolean requiresCurrentPassword = isPasswordLoginEnabled(user);

        if (requiresCurrentPassword && !passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Mật khẩu hiện tại không đúng");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Xác nhận mật khẩu không khớp");
        }

        if (requiresCurrentPassword && passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new BadRequestException("Mật khẩu mới phải khác mật khẩu hiện tại");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setPasswordLoginEnabled(true);
        userRepository.save(user);
    }

    @Override
    public List<ShippingAddressResponse> getShippingAddresses(String email) {
        User user = getUserByEmail(email);
        return shippingAddressRepository.findByUserIdOrderByIsDefaultDescUpdatedAtDesc(user.getId()).stream()
                .map(this::mapToShippingAddressResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ShippingAddressResponse addShippingAddress(String email, ShippingAddressRequest request) {
        User user = getUserByEmail(email);
        ShippingAddress address = ShippingAddress.builder()
                .label(request.getLabel().trim())
                .fullName(request.getFullName().trim())
                .phone(normalizeRequired(request.getPhone()))
                .province(request.getProvince().trim())
                .district(request.getDistrict().trim())
                .ward(request.getWard().trim())
                .detailAddress(request.getDetailAddress().trim())
                .isDefault(request.isDefault())
                .user(user)
                .build();

        boolean hasAddresses = shippingAddressRepository.findByUserIdOrderByIsDefaultDescUpdatedAtDesc(user.getId()).stream()
                .findAny()
                .isPresent();
        if (!hasAddresses) {
            address.setDefault(true);
        }

        if (address.isDefault()) {
            clearDefaultAddress(user.getId());
        }

        return mapToShippingAddressResponse(shippingAddressRepository.save(address));
    }

    @Override
    @Transactional
    public ShippingAddressResponse updateShippingAddress(String email, Long addressId, ShippingAddressRequest request) {
        User user = getUserByEmail(email);
        ShippingAddress address = getShippingAddress(user.getId(), addressId);
        address.setLabel(request.getLabel().trim());
        address.setFullName(request.getFullName().trim());
        address.setPhone(normalizeRequired(request.getPhone()));
        address.setProvince(request.getProvince().trim());
        address.setDistrict(request.getDistrict().trim());
        address.setWard(request.getWard().trim());
        address.setDetailAddress(request.getDetailAddress().trim());

        if (request.isDefault()) {
            clearDefaultAddress(user.getId());
            address.setDefault(true);
        }

        return mapToShippingAddressResponse(shippingAddressRepository.save(address));
    }

    @Override
    @Transactional
    public void deleteShippingAddress(String email, Long addressId) {
        User user = getUserByEmail(email);
        ShippingAddress address = getShippingAddress(user.getId(), addressId);
        boolean wasDefault = address.isDefault();
        shippingAddressRepository.delete(address);

        if (wasDefault) {
            shippingAddressRepository.findByUserIdOrderByIsDefaultDescUpdatedAtDesc(user.getId()).stream()
                    .findFirst()
                    .ifPresent(nextAddress -> {
                        nextAddress.setDefault(true);
                        shippingAddressRepository.save(nextAddress);
                    });
        }
    }

    @Override
    @Transactional
    public ShippingAddressResponse setDefaultShippingAddress(String email, Long addressId) {
        User user = getUserByEmail(email);
        ShippingAddress address = getShippingAddress(user.getId(), addressId);
        clearDefaultAddress(user.getId());
        address.setDefault(true);
        return mapToShippingAddressResponse(shippingAddressRepository.save(address));
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

    private ShippingAddressResponse mapToShippingAddressResponse(ShippingAddress address) {
        return ShippingAddressResponse.builder()
                .id(address.getId())
                .label(address.getLabel())
                .fullName(address.getFullName())
                .phone(address.getPhone())
                .province(address.getProvince())
                .district(address.getDistrict())
                .ward(address.getWard())
                .detailAddress(address.getDetailAddress())
                .isDefault(address.isDefault())
                .createdAt(address.getCreatedAt())
                .updatedAt(address.getUpdatedAt())
                .build();
    }

    private AuthResponse createAuthResponse(User user) {
        String token = jwtUtil.generateToken(user.getEmail());
        UserResponse userResponse = mapToUserResponse(user);

        return AuthResponse.builder()
                .token(token)
                .type("Bearer") 
                .user(userResponse)
                .build();
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));
    }

    private ShippingAddress getShippingAddress(Long userId, Long addressId) {
        return shippingAddressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy địa chỉ giao hàng"));
    }

    private void clearDefaultAddress(Long userId) {
        List<ShippingAddress> addresses = shippingAddressRepository.findByUserIdOrderByIsDefaultDescUpdatedAtDesc(userId);
        addresses.forEach(address -> address.setDefault(false));
        shippingAddressRepository.saveAll(addresses);
    }

    private String normalizePhone(String phone) {
        if (phone == null) {
            return null;
        }
        String trimmed = phone.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private String normalizeRequired(String value) {
        return value == null ? null : value.trim();
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
