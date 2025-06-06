namespace PulsePitch.DTO;

public class TeamGameDTO
{
    public int Id { get; set; }
    public DateTime GameDate { get; set; }
    public int AwayTeamId { get; set; }
    public int HomeTeamId { get; set; }
    public string Result { get; set; }
}
