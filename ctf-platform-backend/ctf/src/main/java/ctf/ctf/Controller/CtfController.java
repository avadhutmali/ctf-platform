package ctf.ctf.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ctf.ctf.Config.ChallengeConfig;
import ctf.ctf.Dto.RegistrationRequest;
import ctf.ctf.Dto.SubmissionRequest;
import ctf.ctf.Models.User;
import ctf.ctf.Service.CtfService;

@RestController // Marks this class as a controller that handles REST API requests.
@RequestMapping("/api") // All endpoints in this class will start with "/api".
@CrossOrigin(origins = "http://localhost:5173")
public class CtfController {

    @Autowired
    private CtfService ctfService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitFlag(@RequestBody SubmissionRequest request) {
        String result = ctfService.submitFlag(
            request.getUserId(),
            request.getPassword(),
            request.getLevel(),
            request.getFlag()
        );
        return ResponseEntity.ok(result);
    }
    @GetMapping("/challenges")
    public ResponseEntity<List<ChallengeConfig.Challenge>> getChallenges() {
        List<ChallengeConfig.Challenge> challenges = ctfService.getAllChallenges();
        return ResponseEntity.ok(challenges);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("CTF API is up and running!");
    }

   @GetMapping("/leaderboard")
    public ResponseEntity<List<User>> getLeaderboard() {
        List<User> leaderboard = ctfService.getLeaderboard();
        return ResponseEntity.ok(leaderboard);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest request) {
        System.out.println(request);
        String result = ctfService.registerUser(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/register-batch")
    public ResponseEntity<String> registerBatch(@RequestBody List<RegistrationRequest> requests) {
        String result = ctfService.registerBatch(requests);
        return ResponseEntity.ok(result);
    }
}

