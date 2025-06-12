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
    public class PlayerTeamRepository : IPlayerTeamRepository
    {
        private readonly PulsePitchDbContext _context;
        public PlayerTeamRepository(PulsePitchDbContext context)
        {
            _context = context;
        }

        public async Task<PlayerTeam> CreatePlayerTeams(PlayerTeam playerTeamModel)
        {
            await _context.PlayerTeams.AddAsync(playerTeamModel);
            await _context.SaveChangesAsync();
            return playerTeamModel;
        }

        public async Task<PlayerTeam?> DeletePlayerTeams(int id)
        {
            var teamModel = await _context.PlayerTeams.FirstOrDefaultAsync(pt => pt.Id == id);

            if (teamModel == null)
            {
                return null;
            }

            _context.PlayerTeams.Remove(teamModel);
            await _context.SaveChangesAsync();
            return teamModel;
        }

        public async Task<List<PlayerTeam>> GetAllPlayerTeams()
        {
            return await _context.PlayerTeams.ToListAsync();
        }

        public async Task<PlayerTeam?> GetByIdPlayerTeams(int id)
        {
            return await _context.PlayerTeams.FirstOrDefaultAsync(pt => pt.Id == id);
        }

        public async Task<PlayerTeam?> UpdatePlayerTeams(int id, PlayerTeam teamModel)
        {
            var existingTeam = await _context.PlayerTeams.FindAsync(id);

            if (existingTeam == null)
            {
                return null;
            }

            existingTeam.PlayerId = teamModel.PlayerId;
            existingTeam.TeamId = teamModel.TeamId;
            await _context.SaveChangesAsync();

            return existingTeam;
        }
    }
}