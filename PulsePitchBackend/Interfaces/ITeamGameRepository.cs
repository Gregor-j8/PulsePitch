using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface ITeamGameRepository
    {
        Task<List<TeamGame>> GetTeamGameByTeamId(string home, List<int> id);
        Task<TeamGame?> GetByIdTeamGame(int id);
        Task<TeamGame> CreateTeamGame(TeamGame teamTeamGameModel);
        Task<TeamGame?> UpdateTeamGame(int id, TeamGame teamTeamGameModel);
        Task<TeamGame?> DeleteTeamGame(int id);
    }
}