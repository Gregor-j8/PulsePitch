using System.ComponentModel.DataAnnotations;

namespace PulsePitch.DTO
{
    public class UpdateTeamMemberRoleDTO
    {
        [Required]
        [MaxLength(50)]
        public string Role { get; set; } = "Player";
    }
}
