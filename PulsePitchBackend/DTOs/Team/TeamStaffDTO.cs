using System.Collections.Generic;
using PulsePitch.DTO;

namespace PulsePitch.DTO
{
    public class TeamStaffDTO
    {
        public List<UserProfileDTO> Managers { get; set; } = new List<UserProfileDTO>();
        public List<UserProfileDTO> Coaches { get; set; } = new List<UserProfileDTO>();
        public List<UserProfileDTO> Players { get; set; } = new List<UserProfileDTO>();
    }
}
