namespace PulsePitch.DTO;

public class CreateMatchRequestDTO
{
    public int Id { get; set; }
    public DateTime ProposedDate { get; set; }
    public string Message { get; set; }
    public int HomeTeamId { get; set; }
    public TeamDTO? HomeTeam { get; set; }
    public int SenderId { get; set; }
    public int AwayTeamId { get; set; }
    public TeamDTO? AwayTeam { get; set; }
    public string RecieverId { get; set; }
    public string Status { get; set; }
}