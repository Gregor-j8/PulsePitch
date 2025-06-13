using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface IEventRepository
    {
        Task<List<TeamEvent>> GetAllEvent();
        Task<TeamEvent?> GetByIdEvent(int id);
        Task<TeamEvent> CreateEvent(TeamEvent teamTeamEventModel);
        Task<TeamEvent?> UpdateEvent(int id, TeamEvent teamTeamEventModel);
        Task<TeamEvent?> DeleteEvent(int id);
    }
}