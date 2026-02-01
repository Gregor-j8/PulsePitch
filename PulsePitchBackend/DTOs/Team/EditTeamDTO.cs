namespace PulsePitch.DTO;

public class EditTeamDTO
{
    public string Name { get; set; }
    public string JoinCode { get; set; }
    public bool? IsPublic { get; set; }
    public bool? RequiresApproval { get; set; }
}