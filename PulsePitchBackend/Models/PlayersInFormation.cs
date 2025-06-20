namespace PulsePitch.Models;

public class PlayersInFormation
{
    public int Id { get; set; }
    public int FormationId { get; set; }
    public Formations? Formation { get; set; }
    public int PositionId { get; set; }
    public string Name { get; set; }
    public string? Role { get; set; }
    public string? Color { get; set; }
    public double X { get; set; }
    public double Y { get; set; }
    public string? Note { get; set; }
}