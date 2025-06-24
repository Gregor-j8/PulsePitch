namespace PulsePitch.Models;

public class MatchRequest
{
    public int Id { get; set; }
    public DateTime ProposedDate { get; set; }
    public string Message { get; set; }
    public int HomeTeamId { get; set; }
    public Team? HomeTeam { get; set; }
    public int SenderId { get; set; }
    public int AwayTeamId { get; set; }
    public Team? AwayTeam { get; set; }
    public int RecieverId { get; set; }
    public string Status { get; set; }
}
