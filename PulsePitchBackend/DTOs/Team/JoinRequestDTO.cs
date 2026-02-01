namespace PulsePitch.DTO;

public class JoinRequestDTO
{
    public int TeamId { get; set; }
    public int PlayerId { get; set; }
    public string? JoinCode { get; set; }
}
