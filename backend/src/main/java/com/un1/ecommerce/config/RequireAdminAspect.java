package com.un1.ecommerce.config;

import com.un1.ecommerce.exception.ForbiddenException;
import com.un1.ecommerce.service.impl.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class RequireAdminAspect {

    @Autowired
    private AuthenticationService authenticationService;

    @Before("@annotation(requireAdmin)")
    public void checkAdminRole(JoinPoint joinPoint, RequireAdmin requireAdmin) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            log.warn("Unauthorized access attempt to admin endpoint");
            throw new ForbiddenException("User is not authenticated");
        }

        String email = authentication.getName();
        log.info("Checking admin role for user: {}", email);

        // Check if user is admin
        if (!authenticationService.isAdmin(email)) {
            log.warn("Non-admin user {} attempted to access admin endpoint", email);
            throw new ForbiddenException(requireAdmin.value());
        }

        log.info("Admin user {} granted access to protected endpoint", email);
    }
}
