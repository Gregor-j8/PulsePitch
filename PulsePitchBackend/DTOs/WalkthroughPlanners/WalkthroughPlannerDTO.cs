namespace PulsePitchBackend.DTOs.WalkthroughPlanners;

public class WalkthroughPlannerDTO
{
    public int Id { get; set; }
    public int FormationId { get; set; }
    public int Duration { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public WalkthroughTimelineDTO Timeline { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
