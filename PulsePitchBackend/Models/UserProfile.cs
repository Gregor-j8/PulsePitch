using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace PulsePitch.Models;
  public class UserProfile
{
    public int Id { get; set; }
    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; }
    [Required]
    [MaxLength(50)]
    public string LastName { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public DateTime CreateDateTime { get; set; }
    [DataType(DataType.Url)]
    [MaxLength(255)]
    public string ImageLocation { get; set; }
    public List<PlayerTeam>? Teams { get; set; }
    public List<string> Roles { get; set; }
    public string IdentityUserId { get; set; }
    public IdentityUser IdentityUser { get; set; }

    public string FullName
    {
        get
        {
            return $"{FirstName} {LastName}";
        }
    }
}