package ctf.ctf.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ctf.ctf.Models.Challenge;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    // Finds a challenge by its unique level number.
    Optional<Challenge> findByLevel(int level);
}
