using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace PulsePitch.DTO;

public class UserProfileDTO
{
    public int Id { get; set; }
    public string IdentityUserId { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public List<string> Roles { get; set; }
}