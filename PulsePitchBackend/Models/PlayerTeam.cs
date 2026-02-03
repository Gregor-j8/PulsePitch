using System.ComponentModel.DataAnnotations;
namespace PulsePitch.Models;

public class PlayerTeam
{
    [Required]
    public int Id { get; set; }
    [Required]
    public int PlayerId { get; set; }
    public UserProfile? Player { get; set; }
    [Required]
    public int TeamId { get; set; }
    public Team? Team { get; set; }

    [Required]
    [MaxLength(50)]
    public string Role { get; set; } = "Player";

    public string? Status { get; set; }
    public DateTime? RequestedAt { get; set; }
    public DateTime? RespondedAt { get; set; }
}
