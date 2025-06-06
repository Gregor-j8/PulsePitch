using System.ComponentModel.DataAnnotations;
namespace PulsePitch.Models;

public class PlayerTeam
{
    [Required]
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public UserProfile Player { get; set; }
    public int TeamId { get; set; }
    public Team Team { get; set; }
}
