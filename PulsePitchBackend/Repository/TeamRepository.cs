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
            UserProfile coachesProfile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.IdentityUserId == teamModel.CoachId);
            if (coachesProfile != null)
            {
                PlayerTeam pt = new PlayerTeam
                {
                    PlayerId = coachesProfile.Id,
                    TeamId = teamModel.Id
                };
                await _context.PlayerTeams.AddAsync(pt);

            }
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
            existingTeam.IsPublic = teamModel.IsPublic;
            existingTeam.RequiresApproval = teamModel.RequiresApproval;
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

        public async Task<List<Team>> GetPublicTeams()
        {
            return await _context.Teams
                .Where(t => t.IsPublic)
                .OrderBy(t => t.Name)
                .ToListAsync();
        }

        public async Task<List<Team>> SearchPublicTeams(string searchTerm)
        {
            return await _context.Teams
                .Where(t => t.IsPublic && t.Name.Contains(searchTerm))
                .OrderBy(t => t.Name)
                .ToListAsync();
        }

        public async Task<PlayerTeam?> RequestJoinTeam(JoinRequestDTO request)
        {
            var team = await _context.Teams.FindAsync(request.TeamId);
            if (team == null)
                throw new InvalidOperationException("Team not found");

            if (!team.IsPublic)
            {
                if (string.IsNullOrEmpty(request.JoinCode) || request.JoinCode != team.JoinCode)
                    throw new InvalidOperationException("Invalid join code");
            }

            var existing = await _context.PlayerTeams
                .FirstOrDefaultAsync(pt => pt.PlayerId == request.PlayerId && pt.TeamId == request.TeamId);

            if (existing != null)
                return existing;

            var playerTeam = new PlayerTeam
            {
                PlayerId = request.PlayerId,
                TeamId = request.TeamId,
                Status = team.RequiresApproval ? "pending" : null,
                RequestedAt = DateTime.UtcNow
            };

            await _context.PlayerTeams.AddAsync(playerTeam);
            await _context.SaveChangesAsync();
            return playerTeam;
        }

        public async Task<List<PlayerTeam>> GetPendingJoinRequests(int teamId)
        {
            return await _context.PlayerTeams
                .Include(pt => pt.Player)
                .Where(pt => pt.TeamId == teamId && pt.Status == "pending")
                .OrderByDescending(pt => pt.RequestedAt)
                .ToListAsync();
        }

        public async Task<PlayerTeam?> RespondToJoinRequest(int playerTeamId, JoinRequestResponseDTO response)
        {
            var playerTeam = await _context.PlayerTeams.FindAsync(playerTeamId);

            if (playerTeam == null || playerTeam.Status != "pending")
                throw new InvalidOperationException("Invalid join request");

            playerTeam.Status = response.Status;
            playerTeam.RespondedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return playerTeam;
        }
    }
}