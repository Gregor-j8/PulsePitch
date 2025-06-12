using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface ITeamRepository
    {
        Task<List<Team>> GetAllTeams();
        Task<Team?> GetByIdTeams(int id);
        Task<Team> CreateTeams(Team teamTeamModel);
        Task<Team?> UpdateTeams(int id, Team teamTeamModel);
        Task<Team?> DeleteTeams(int id);
    }
}