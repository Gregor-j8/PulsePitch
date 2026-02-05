namespace PulsePitchBackend.DTOs.WalkthroughPlanners;

public class BallWalkthroughDTO
{
    public List<BallKeyframeDTO> Keyframes { get; set; } = new();
    public string PathColor { get; set; } = "#FFFFFF";
}
