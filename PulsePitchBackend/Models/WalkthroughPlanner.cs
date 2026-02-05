using PulsePitch.Models;

namespace PulsePitchBackend.Models;

public class WalkthroughPlanner
{
    public int Id { get; set; }
    public int FormationId { get; set; }
    public Formations? Formation { get; set; }
    public int Duration { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string TimelineData { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
