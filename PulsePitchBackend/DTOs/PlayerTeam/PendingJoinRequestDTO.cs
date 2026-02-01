namespace PulsePitch.DTO;

public class PendingJoinRequestDTO
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public UserProfileDTO? Player { get; set; }
    public int TeamId { get; set; }
    public string? Status { get; set; }
    public DateTime? RequestedAt { get; set; }
}
