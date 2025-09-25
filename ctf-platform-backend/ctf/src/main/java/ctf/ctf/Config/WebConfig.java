package ctf.ctf.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Apply to all /api/ routes
            // Explicitly list the URLs that are allowed to connect.
            .allowedOrigins(
                "http://localhost:5173",          // For your local development
                "https://ctf-platform-pi.vercel.app" // For your deployed frontend
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true); // This is now safe because we list specific origins
    }
}