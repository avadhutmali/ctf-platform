package ctf.ctf.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data // Lombok annotation to automatically create getters, setters, toString, etc.
@Entity // Tells JPA that this class is a table in the database.
@Table(name = "users") // Specifies the actual table name.
public class User {

    @Id // Marks this field as the primary key.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configures the ID to be auto-incremented by the database.
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false) // This column cannot be null.
    private String password;

    @Column(columnDefinition = "integer default 0") // Sets a default value for the column.
    private int score;

    // We will store solved levels as a comma-separated string, e.g., "1,3,5"
    private String solvedLevels;
}
