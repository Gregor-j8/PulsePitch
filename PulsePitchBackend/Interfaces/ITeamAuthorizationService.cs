using System.Threading.Tasks;

namespace PulsePitch.Interfaces
{
    public interface ITeamAuthorizationService
    {
        Task<bool> IsTeamManager(int teamId, string identityUserId);
        Task<bool> IsTeamCoach(int teamId, string identityUserId);
        Task<bool> IsTeamMember(int teamId, string identityUserId);
        Task<bool> CanManageRoster(int teamId, string identityUserId);
        Task<bool> CanManageFormations(int teamId, string identityUserId);
        Task<string?> GetUserRoleForTeam(int teamId, string identityUserId);
        Task<bool> IsAdmin(string identityUserId);
    }
}
