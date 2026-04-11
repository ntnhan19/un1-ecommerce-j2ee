package com.un1.ecommerce.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI un1EcommerceOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("UN1 E-Commerce API")
                .description("API documentation for UN1 E-Commerce backend")
                .version("v0.0.1"));
    }
}
