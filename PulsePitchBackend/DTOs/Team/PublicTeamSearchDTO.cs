using System.Collections.Generic;

namespace PulsePitch.DTO;

public class PublicTeamSearchDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<string> ManagerNames { get; set; } = new List<string>();
    public List<string> CoachNames { get; set; } = new List<string>();
    public bool RequiresApproval { get; set; }
    public int MemberCount { get; set; }
}
