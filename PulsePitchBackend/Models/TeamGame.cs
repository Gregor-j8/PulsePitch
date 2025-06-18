using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PulsePitch.Models;

public class TeamGame
{
    [Required]
    public int Id { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    [ForeignKey("AwayTeamId")]
    public int AwayTeamId { get; set; }
    public Team? AwayTeam { get; set; }
    [ForeignKey("HomeTeamId")]
    public int HomeTeamId { get; set; }
    public Team? HomeTeam { get; set; }
    public string? Result { get; set; }
}
