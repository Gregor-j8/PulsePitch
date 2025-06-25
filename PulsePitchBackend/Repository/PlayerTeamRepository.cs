using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Data;
using PulsePitch.Interfaces;
using PulsePitch.Models;
using Microsoft.EntityFrameworkCore;
using PulsePitch.DTO;

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
            return await _context.PlayerTeams.Include(pt => pt.Player).Include(pt => pt.Team).ToListAsync();
        }

        public async Task<List<PlayerTeam?>> GetByIdPlayerTeams(int id)
        {
            return await _context.PlayerTeams.Include(pt => pt.Player).Include(pt => pt.Team).Where(pt => pt.TeamId == id).ToListAsync();
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
        public async Task<List<PlayerTeam?>> GetTeamsByPlayerId(int id)
        {
            var playerTeams = await _context.PlayerTeams
            .Where(pt => pt.PlayerId == id).Include(pt => pt.Team).Include(pt => pt.Player).ToListAsync();
            if (playerTeams.Count == 0) return null;

            return playerTeams;
        }
    }
}