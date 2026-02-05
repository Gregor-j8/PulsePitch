namespace PulsePitchBackend.DTOs.WalkthroughPlanners;

public class KeyframeDTO
{
    public int Time { get; set; }
    public double X { get; set; }
    public double Y { get; set; }
    public string? Action { get; set; }
}
