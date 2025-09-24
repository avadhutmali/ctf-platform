package ctf.ctf.Dto;

import lombok.Data;

@Data 
public class SubmissionRequest {
    private Long userId;
    private String password;
    private int level;
    private String flag;
}

