using System.Collections.Generic;

namespace PulsePitch.DTO;

public class TeamDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string JoinCode { get; set; }
    public string? CoachId { get; set; } // Temporary - will be removed in Commit 6
    public List<string>? ManagerNames { get; set; }
    public List<string>? CoachNames { get; set; }
    public bool IsPublic { get; set; }
    public bool RequiresApproval { get; set; }
}
