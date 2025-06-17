namespace PulsePitch.DTO;

public class TeamGameDTO
{
    public int Id { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public int? AwayTeamId { get; set; }
    public TeamDTO? AwayTeam { get; set; }
    public int HomeTeamId { get; set; }
    public TeamDTO? HomeTeam { get; set; }
    public string? Result { get; set; }
}
