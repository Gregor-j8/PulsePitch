namespace PulsePitch.DTO;

public class PublicTeamSearchDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string CoachId { get; set; }
    public string CoachName { get; set; }
    public bool RequiresApproval { get; set; }
    public int MemberCount { get; set; }
}
