namespace PulsePitchBackend.DTOs.WalkthroughPlanners;

public class PlayerWalkthroughDTO
{
    public List<KeyframeDTO> Keyframes { get; set; } = new();
    public string PathType { get; set; } = "straight";
    public string? Color { get; set; }
}
