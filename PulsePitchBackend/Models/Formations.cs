namespace PulsePitch.Models;

public class Formations
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int TeamId { get; set; }
    public Team? Team { get; set; }
    public List<PlayersInFormation>? Players { get; set; }
}