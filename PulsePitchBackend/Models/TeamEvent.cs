using System.ComponentModel.DataAnnotations;
namespace PulsePitch.Models;

public class TeamEvent
{
    [Required]
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public int TeamId { get; set; }
    public Team Team { get; set; }
}
