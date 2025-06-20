using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface IPlayerTeamRepository
    {
        Task<List<PlayerTeam>> GetAllPlayerTeams();
        Task<List<PlayerTeam?>> GetByIdPlayerTeams(int id);
        Task<PlayerTeam> CreatePlayerTeams(PlayerTeam playerTeam);
        Task<PlayerTeam?> UpdatePlayerTeams(int id, PlayerTeam playerTeam);
        Task<PlayerTeam?> DeletePlayerTeams(int id);
        Task<List<PlayerTeam>> GetTeamsByPlayerId(int id);
    }
}