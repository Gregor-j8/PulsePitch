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
    public int CoachId { get; set; }
    public User Coach { get; set; }
}
