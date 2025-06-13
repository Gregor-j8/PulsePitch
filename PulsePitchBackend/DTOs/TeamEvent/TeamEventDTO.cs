namespace PulsePitch.DTO;

public class TeamEventDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public int TeamId { get; set; }
    public int EventId { get; set; }
}
