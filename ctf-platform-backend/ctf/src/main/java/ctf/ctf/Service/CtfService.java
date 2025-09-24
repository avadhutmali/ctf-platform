package ctf.ctf.Service;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ctf.ctf.Config.ChallengeConfig;
import ctf.ctf.Dto.RegistrationRequest;
import ctf.ctf.Models.Challenge;
import ctf.ctf.Models.User;
import ctf.ctf.Repository.ChallengeRepository;
import ctf.ctf.Repository.UserRepository;

@Service
public class CtfService {

    @Autowired // Spring automatically injects an instance of our repositories.
    private UserRepository userRepository;

    // @Autowired
    // private ChallengeRepository challengeRepository;

    @Autowired
    private ChallengeConfig challengeConfig;

    public String registerUser(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            return "Error: User ID or Username is already taken.";
        }
        User newUser = new User();
        newUser.setUsername(username); // SET THE USERNAME
        newUser.setPassword(password);
        newUser.setScore(0);
        newUser.setSolvedLevels("");
        userRepository.save(newUser);
        return "User registered successfully!";
    }

    //Logic for registering a batch of users ---
   public String registerBatch(List<RegistrationRequest> requests) {
    int successCount = 0;
    int skippedCount = 0;
    StringBuilder skippedUsers = new StringBuilder();

    for (RegistrationRequest request : requests) {
        if (userRepository.existsByUsername(request.getUsername())) {
            skippedCount++;
            if (skippedUsers.length() > 0) {
                skippedUsers.append(", ");
            }
            skippedUsers.append(request.getUsername());
        } else {
            User newUser = new User();
            newUser.setUsername(request.getUsername()); // SET THE USERNAME
            newUser.setPassword(request.getPassword());
            newUser.setScore(0);
            newUser.setSolvedLevels("");
            userRepository.save(newUser);
            successCount++;
        }
    }

    String response = successCount + " users registered successfully.";
    if (skippedCount > 0) {
        response += " Skipped " + skippedCount + " users (already exist): " + skippedUsers.toString();
    }
    return response;
}

    @Transactional
public String submitFlag(Long userId, String password, int level, String flag) {
    Optional<User> userOpt = userRepository.findById(userId);
    if (userOpt.isEmpty()) {
        return "Error: User not found.";
    }
    User user = userOpt.get();
    if (!user.getPassword().equals(password)) {
        return "Error: Invalid password.";
    }

    Optional<ChallengeConfig.Challenge> challengeOpt = challengeConfig.getChallenges().stream()
            .filter(c -> c.getLevel() == level)
            .findFirst();

    if (challengeOpt.isEmpty()) {
        return "Error: Level does not exist.";
    }
    ChallengeConfig.Challenge challenge = challengeOpt.get();
    if (!challenge.getFlag().equals(flag)) {
        return "Incorrect Flag. Try again!";
    }

    String solvedLevels = user.getSolvedLevels() == null ? "" : user.getSolvedLevels();
    if (Arrays.asList(solvedLevels.split(",")).contains(String.valueOf(level))) {
        return "You have already solved this level.";
    }

    user.setScore(user.getScore() + challenge.getPoints());
    String newSolvedLevels = solvedLevels.isEmpty() ? String.valueOf(level) : solvedLevels + "," + level;
    user.setSolvedLevels(newSolvedLevels);

    userRepository.save(user);
    return "Correct! You've earned " + challenge.getPoints() + " points.";
}


    public List<ChallengeConfig.Challenge> getAllChallenges() {
        return challengeConfig.getChallenges();
    }

    public List<User> getLeaderboard() {
            return userRepository.findAllByOrderByScoreDesc();
        }
    }

