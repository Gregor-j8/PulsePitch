namespace PulsePitchBackend.DTOs.WalkthroughPlanners;

public class BallKeyframeDTO
{
    public int Time { get; set; }
    public double X { get; set; }
    public double Y { get; set; }
    public string? Action { get; set; }
    public int? HolderId { get; set; }
}
