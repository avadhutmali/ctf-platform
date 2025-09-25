package ctf.ctf.Config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import java.time.Instant;

@Configuration
@ConfigurationProperties(prefix = "ctf.contest")
@Data
public class ContestConfig {
    private Instant startTime;
    private int durationMinutes;
    private int freezeMinutes;
}