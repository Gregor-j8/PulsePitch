namespace PulsePitchBackend.DTOs.WalkthroughPlanners;

public class WalkthroughTimelineDTO
{
    public int Duration { get; set; }
    public Dictionary<int, PlayerWalkthroughDTO> Players { get; set; } = new();
    public BallWalkthroughDTO Ball { get; set; } = new();
    public List<WalkthroughEventDTO> Events { get; set; } = new();
}
