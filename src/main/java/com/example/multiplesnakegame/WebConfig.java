package com.example.multiplesnakegame;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // allow all paths
                .allowedOrigins("http://localhost:3000") // your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE") // allowed HTTP methods
                .allowCredentials(true);
    }
}