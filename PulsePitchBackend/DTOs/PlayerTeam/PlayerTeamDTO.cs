namespace PulsePitch.DTO;

public class PlayerTeamDTO
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public UserProfileDTO? Player { get; set; }
    public int TeamId { get; set; }
    public TeamDTO? Team { get; set; }
}
