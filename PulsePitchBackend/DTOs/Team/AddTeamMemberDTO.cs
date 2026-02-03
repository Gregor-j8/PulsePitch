using System.ComponentModel.DataAnnotations;

namespace PulsePitch.DTO
{
    public class AddTeamMemberDTO
    {
        [Required]
        public int UserProfileId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Role { get; set; } = "Player";
    }
}
