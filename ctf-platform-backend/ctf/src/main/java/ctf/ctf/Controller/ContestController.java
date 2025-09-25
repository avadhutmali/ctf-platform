package ctf.ctf.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ctf.ctf.Dto.ContestStatusResponse;
import ctf.ctf.Service.CtfService;

@RestController
@RequestMapping("/api/contest")
public class ContestController {

    @Autowired
    private CtfService ctfService;

    @GetMapping("/status")
    public ResponseEntity<ContestStatusResponse> getContestStatus() {
        ContestStatusResponse status = ctfService.getContestStatus();
        return ResponseEntity.ok(status);
    }
}