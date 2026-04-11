package com.un1.ecommerce.config;

import com.un1.ecommerce.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
@SuppressWarnings("null")
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final com.un1.ecommerce.repository.UserRepository userRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initRole("ROLE_USER");
        initRole("ROLE_ADMIN");
        seedAdminUser();
    }

    private void seedAdminUser() {
        if (userRepository.findByEmail("admin@ecommerce.com").isEmpty()) {
            com.un1.ecommerce.entity.User admin = com.un1.ecommerce.entity.User.builder()
                    .email("admin@ecommerce.com")
                    .password(passwordEncoder.encode("admin123"))
                    .fullName("Systems Administrator")
                    .roles(new java.util.HashSet<>())
                    .build();

            roleRepository.findByName("ROLE_ADMIN").ifPresent(role -> admin.getRoles().add(role));
            roleRepository.findByName("ROLE_USER").ifPresent(role -> admin.getRoles().add(role));

            userRepository.save(admin);
            log.info("Default Admin account created: admin@ecommerce.com / admin123");
        }
    }

    private void initRole(String roleName) {
        if (roleRepository.findByName(roleName).isEmpty()) {
            roleRepository.save(com.un1.ecommerce.entity.Role.builder().name(roleName).build());
            log.info("Initialized role: {}", roleName);
        }
    }
}