using System.Collections.Generic;

namespace PulsePitch.DTO
{
    public class AnalyticsDTO
    {
        public int TotalUsers { get; set; }
        public int TotalTeams { get; set; }
        public Dictionary<string, int> UsersByRole { get; set; } = new Dictionary<string, int>();
        public int PublicTeams { get; set; }
        public int PrivateTeams { get; set; }
    }
}
