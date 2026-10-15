package nl.sheldongopi.ctfhub.challenge;

/**
 * One challenge from a CTF competition, as the team sees it on the board.
 *
 * @param assignee who on the team is working on it; null while nobody has picked it up
 */
public record Challenge(String name, Category category, int points, Status status, String assignee) {

    public enum Category { WEB, CRYPTO, PWN, REVERSING, FORENSICS, MISC }

    public enum Status { OPEN, IN_PROGRESS, SOLVED }
}
