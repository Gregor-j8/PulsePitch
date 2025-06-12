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
    }
}