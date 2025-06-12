using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<TeamEvent>> GetAllAsync();
        Task<TeamEvent?> GetByIdAsync(int id);
        Task<TeamEvent> CreateAsync(TeamEvent teamTeamEventModel);
        Task<TeamEvent?> UpdateAsync(int id, TeamEvent teamTeamEventModel);
        Task<TeamEvent?> DeleteAsync(int id);
    }
}