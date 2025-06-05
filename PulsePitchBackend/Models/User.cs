using System.ComponentModel.DataAnnotations;

namespace PulsePitch.Models;

public class User
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }

    [Required, EmailAddress]
    public string Email { get; set; }

    [Required]
    public string PasswordHash { get; set; }

    public bool IsCoach { get; set; } = false;
}
