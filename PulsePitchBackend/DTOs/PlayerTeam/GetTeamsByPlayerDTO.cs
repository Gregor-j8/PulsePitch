namespace PulsePitch.DTO;

public class GetTeamsByPlayerIdDTO
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public UserProfileDTO User { get; set; }
    public int TeamId { get; set; }
    public TeamDTO Team { get; set; }
}
