package ctf.ctf.Repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ctf.ctf.Models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);
    boolean existsByUsername(String username);

    List<User> findAllByOrderByScoreDesc();
}
