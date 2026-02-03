namespace PulsePitch.DTO;

public class PlayerTeamDTO
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public UserProfileDTO? Player { get; set; }
    public int TeamId { get; set; }
    public TeamDTO? Team { get; set; }
    public string Role { get; set; } = "Player";
    public string? Status { get; set; }
    public DateTime? RequestedAt { get; set; }
    public DateTime? RespondedAt { get; set; }
}
