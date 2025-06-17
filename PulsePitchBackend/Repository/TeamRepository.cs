using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Data;
using PulsePitch.Interfaces;
using PulsePitch.Models;
using PulsePitch.DTO;
using Microsoft.EntityFrameworkCore;

namespace PulsePitch.Repository
{
    public class TeamRepository : ITeamRepository
    {
        private readonly PulsePitchDbContext _context;
        public TeamRepository(PulsePitchDbContext context)
        {
            _context = context;
        }

        public async Task<Team> CreateTeams(Team teamModel)
        {
            await _context.Teams.AddAsync(teamModel);
            await _context.SaveChangesAsync();
            return teamModel;
        }

        public async Task<Team?> DeleteTeams(int id)
        {
            var teamModel = await _context.Teams.FirstOrDefaultAsync(x => x.Id == id);

            if (teamModel == null)
            {
                return null;
            }

            _context.Teams.Remove(teamModel);
            await _context.SaveChangesAsync();
            return teamModel;
        }

        public async Task<List<Team>> GetAllTeams()
        {
            return await _context.Teams.ToListAsync();
        }

        public async Task<Team?> GetByIdTeams(int id)
        {
            return await _context.Teams.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Team?> UpdateTeams(int id, Team teamModel)
        {
            var existingTeam = await _context.Teams.FindAsync(id);

            if (existingTeam == null)
            {
                return null;
            }

            existingTeam.Name = teamModel.Name;
            existingTeam.JoinCode = teamModel.JoinCode;
            await _context.SaveChangesAsync();

            return existingTeam;
        }
        public async Task<PlayerTeam?> JoinTeams(JoinTeamDTO teamModel)
        {
                Team team = await _context.Teams.FirstOrDefaultAsync(t => t.Name == teamModel.TeamName && t.JoinCode == teamModel.JoinCode);
                if (team == null)
                {
                    throw new InvalidOperationException("Team not found with provided name and join code.");
                }

                PlayerTeam joinTeamData = new PlayerTeam
                {
                    PlayerId = teamModel.PlayerId,
                    TeamId = team.Id,
                };

                var alreadyJoined = await _context.PlayerTeams.AnyAsync(pt => pt.PlayerId == joinTeamData.PlayerId && pt.TeamId == joinTeamData.TeamId);
                if (alreadyJoined)
                {
                return joinTeamData;
                }
                
                await _context.PlayerTeams.AddAsync(joinTeamData);
                await _context.SaveChangesAsync();
                return joinTeamData;

        }
    }
}