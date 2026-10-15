package nl.sheldongopi.ctfhub.challenge;

import static nl.sheldongopi.ctfhub.challenge.Challenge.Category.*;
import static nl.sheldongopi.ctfhub.challenge.Challenge.Status.*;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** REST endpoints for the challenge board. Sample data for now; a database comes later. */
@RestController
@RequestMapping("/api/challenges")
public class ChallengeController {

    private static final List<Challenge> CHALLENGES = List.of(
            new Challenge("Cookie Monster", WEB, 100, SOLVED, "Sheldon"),
            new Challenge("Baby RSA", CRYPTO, 200, IN_PROGRESS, "Sheldon"),
            new Challenge("Stack Smash", PWN, 300, OPEN, null),
            new Challenge("Hidden in Plain Sight", FORENSICS, 150, IN_PROGRESS, "Teammate"),
            new Challenge("Crackme 1", REVERSING, 250, OPEN, null),
            new Challenge("Sanity Check", MISC, 50, SOLVED, "Teammate"));

    @GetMapping
    public List<Challenge> all() {
        return CHALLENGES;
    }
}
