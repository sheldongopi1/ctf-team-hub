package nl.sheldongopi.ctfhub.challenge;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class ChallengeControllerTest {

    @Test
    void openChallengesHaveNobodyOnThem() {
        var challenges = new ChallengeController().all();

        assertThat(challenges).isNotEmpty();
        assertThat(challenges)
                .filteredOn(c -> c.status() == Challenge.Status.OPEN)
                .allSatisfy(c -> assertThat(c.assignee()).isNull());
    }
}
