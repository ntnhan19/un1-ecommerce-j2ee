package com.un1.ecommerce.config;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequireAdmin {
    String value() default "User must have ADMIN role to access this resource";
}
