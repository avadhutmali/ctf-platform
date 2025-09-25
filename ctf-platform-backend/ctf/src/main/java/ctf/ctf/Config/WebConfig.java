package ctf.ctf.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // This value is for your deployed frontend URL from your environment variables.
    // It's good practice to keep it for production.
    @Value("${frontend.url:http://localhost:5173}") // Default to localhost for safety
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // This rule applies to ALL paths that start with "/api/"
        registry.addMapping("/api/**")
            // This allows your local development server AND your deployed frontend
            .allowedOrigins("*")
            // This allows the browser to send standard request types
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            // This allows all headers (like Content-Type, Authorization, etc.)
            .allowedHeaders("*")
            // This is necessary for sending credentials/cookies if you add them later
            .allowCredentials(true);
    }
}
