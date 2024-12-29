package com.ahmed.courses.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow requests from your Angular app running on http://localhost:4200
        registry.addMapping("/**")  // Apply to all endpoints
                .allowedOrigins("http://localhost:4200")  // Allow Angular frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow necessary methods
                .allowedHeaders("*");  // Allow all headers
    }
}
