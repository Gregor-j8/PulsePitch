using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PulsePitch.DTO
{
    public class UpdateUserRolesDTO
    {
        [Required]
        public List<string> Roles { get; set; } = new List<string>();
    }
}
