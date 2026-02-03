using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Models;
using PulsePitch.DTO;

namespace PulsePitch.Interfaces
{
    public interface ITeamRepository
    {
        Task<List<Team>> GetAllTeams();
        Task<Team?> GetByIdTeams(int id);
        Task<Team> CreateTeams(Team TeamModel);
        Task<Team?> UpdateTeams(int id, Team TeamModel);
        Task<PlayerTeam?> JoinTeams(JoinTeamDTO TeamModel);
        Task<Team?> DeleteTeams(int id);
        Task<List<Team>> GetPublicTeams();
        Task<List<Team>> SearchPublicTeams(string searchTerm);
        Task<PlayerTeam?> RequestJoinTeam(JoinRequestDTO request);
        Task<List<PlayerTeam>> GetPendingJoinRequests(int teamId);
        Task<PlayerTeam?> RespondToJoinRequest(int playerTeamId, JoinRequestResponseDTO response);
        Task<bool> AddTeamMember(int teamId, int userProfileId, string role);
        Task<bool> UpdateTeamMemberRole(int teamId, int userProfileId, string newRole);
        Task<bool> RemoveTeamMember(int teamId, int userProfileId);
        Task<List<UserProfile>> GetTeamMembersByRole(int teamId, string role);
    }
}