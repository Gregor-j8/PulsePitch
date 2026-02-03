using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace PulsePitch.Models;

public class Team
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string JoinCode { get; set; }

    public bool IsPublic { get; set; }
    public bool RequiresApproval { get; set; }

    public List<PlayerTeam>? Members { get; set; }
}
