package org.example.rdv_app.dao.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // pour toutes les routes
                        .allowedOrigins("http://localhost:5173") // frontend URL
                        .allowedMethods("*")
                        .allowCredentials(true);
            }
        };
    }


}

