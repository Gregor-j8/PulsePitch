using System.ComponentModel.DataAnnotations;
namespace PulsePitch.Models;

public class Events
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}
