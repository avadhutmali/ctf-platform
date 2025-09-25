package ctf.ctf.Dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContestStatusResponse {
    private String status; // e.g., "PENDING", "RUNNING", "FROZEN", "FINISHED"
    private Instant startTime;
    private Instant endTime;
    private Instant freezeTime;
    private Instant serverTime; // The current official server time
    private boolean isFrozen;
}