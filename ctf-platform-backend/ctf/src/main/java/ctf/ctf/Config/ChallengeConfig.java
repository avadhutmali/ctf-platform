package ctf.ctf.Config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "ctf") 
@Data
public class ChallengeConfig {

    private List<Challenge> challenges;

    @Data
    public static class Challenge {
        private int level;
        private String flag;
        private int points;
    }
}