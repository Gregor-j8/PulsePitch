using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PulsePitch.Data;
using PulsePitch.Interfaces;
using PulsePitch.Models;

namespace PulsePitch.Services
{
    public class TeamAuthorizationService : ITeamAuthorizationService
    {
        private readonly PulsePitchDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public TeamAuthorizationService(PulsePitchDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<bool> IsAdmin(string identityUserId)
        {
            var user = await _userManager.FindByIdAsync(identityUserId);
            if (user == null) return false;
            return await _userManager.IsInRoleAsync(user, "Admin");
        }

        public async Task<string?> GetUserRoleForTeam(int teamId, string identityUserId)
        {
            var userProfile = await _context.UserProfiles
                .FirstOrDefaultAsync(up => up.IdentityUserId == identityUserId);

            if (userProfile == null) return null;

            var playerTeam = await _context.PlayerTeams
                .FirstOrDefaultAsync(pt => pt.TeamId == teamId && pt.PlayerId == userProfile.Id);

            return playerTeam?.Role;
        }

        public async Task<bool> IsTeamManager(int teamId, string identityUserId)
        {
            if (await IsAdmin(identityUserId)) return true;
            var role = await GetUserRoleForTeam(teamId, identityUserId);
            return role == "Manager";
        }

        public async Task<bool> IsTeamCoach(int teamId, string identityUserId)
        {
            if (await IsAdmin(identityUserId)) return true;
            var role = await GetUserRoleForTeam(teamId, identityUserId);
            return role == "Coach";
        }

        public async Task<bool> IsTeamMember(int teamId, string identityUserId)
        {
            if (await IsAdmin(identityUserId)) return true;
            var role = await GetUserRoleForTeam(teamId, identityUserId);
            return role != null;
        }

        public async Task<bool> CanManageRoster(int teamId, string identityUserId)
        {
            if (await IsAdmin(identityUserId)) return true;
            var role = await GetUserRoleForTeam(teamId, identityUserId);
            return role == "Manager";
        }

        public async Task<bool> CanManageFormations(int teamId, string identityUserId)
        {
            if (await IsAdmin(identityUserId)) return true;
            var role = await GetUserRoleForTeam(teamId, identityUserId);
            return role == "Manager" || role == "Coach";
        }
    }
}
