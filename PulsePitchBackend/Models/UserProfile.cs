using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace PulsePitch.Models;

public class UserProfile
{
    [Required]
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string IdentityUserId { get; set; }
    public IdentityUser IdentityUser { get; set; }
}