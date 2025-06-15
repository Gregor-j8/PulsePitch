using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Data;
using PulsePitch.Interfaces;
using PulsePitch.Models;
using Microsoft.EntityFrameworkCore;

namespace PulsePitch.Repository
{
    public class EventRepository : ITeamEventRepository
    {
        private readonly PulsePitchDbContext _context;
        public EventRepository(PulsePitchDbContext context)
        {
            _context = context;
        }

        public async Task<TeamEvent> CreateEvent(TeamEvent TeamEventModel)
        {
            await _context.TeamEvents.AddAsync(TeamEventModel);
            await _context.SaveChangesAsync();
            return TeamEventModel;
        }

        public async Task<TeamEvent?> DeleteEvent(int id)
        {
            var TeamEventModel = await _context.TeamEvents.FirstOrDefaultAsync(x => x.Id == id);

            if (TeamEventModel == null)
            {
                return null;
            }

            _context.TeamEvents.Remove(TeamEventModel);
            await _context.SaveChangesAsync();
            return TeamEventModel;
        }

        public async Task<List<TeamEvent>> GetAllEvent()
        {
            return await _context.TeamEvents.ToListAsync();
        }

        public async Task<TeamEvent?> GetByIdEvent(int id)
        {
            return await _context.TeamEvents.Include(te => te.Team).Include(te => te.Event).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<TeamEvent?> UpdateEvent(int id, TeamEvent TeamEventModel)
        {
            var existingTeamEvent = await _context.TeamEvents.FindAsync(id);

            if (existingTeamEvent == null)
            {
                return null;
            }

            existingTeamEvent.Title = TeamEventModel.Title;
            existingTeamEvent.Description = TeamEventModel.Description;
            existingTeamEvent.Start = TeamEventModel.Start;
            existingTeamEvent.End = TeamEventModel.End;
            existingTeamEvent.TeamId = TeamEventModel.TeamId;
            existingTeamEvent.EventId = TeamEventModel.EventId;
            await _context.SaveChangesAsync();

            return existingTeamEvent;
        }
    }
}