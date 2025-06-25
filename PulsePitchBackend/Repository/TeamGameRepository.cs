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
    public class TeamGameRepository : ITeamGameRepository
    {
        private readonly PulsePitchDbContext _context;
        public TeamGameRepository(PulsePitchDbContext context)
        {
            _context = context;
        }
        public async Task<List<TeamGame>> GetTeamGameByTeamId(string home, List<int> id)
        {
            List<TeamGame> teamGame = await _context.TeamGames.Include(te => te.HomeTeam).Include(te => te.AwayTeam).ToListAsync();

            if (home == "home")
            {
                List<TeamGame> filteredGames = teamGame.Where(tg => id.Contains(tg.HomeTeamId)).ToList();
                return filteredGames;
            }
            else if (home == "away")
            {
                List<TeamGame> filteredGames = teamGame.Where(tg => id.Contains(tg.AwayTeamId)).ToList();
                return filteredGames;
            }
            List<TeamGame> allGames = teamGame.Where(tg => id.Any(teamId => tg.HomeTeamId == teamId || tg.AwayTeamId == teamId) && tg.OnCalendar == true).ToList();
            return allGames;
        }

        public async Task<TeamGame?> GetByIdTeamGame(int id)
        {
            return await _context.TeamGames.Include(tg => tg.HomeTeam).Include(tg => tg.AwayTeam).FirstOrDefaultAsync(tg => tg.Id == id);
        }

        public async Task<TeamGame> CreateTeamGame(TeamGame TeamGameModel)
        {
            await _context.TeamGames.AddAsync(TeamGameModel);
            await _context.SaveChangesAsync();
            return TeamGameModel;
        }

        public async Task<TeamGame?> UpdateTeamGame(int id, TeamGame TeamGameModel)
        {
            var existingTeamGame = await _context.TeamGames.FindAsync(id);

            if (existingTeamGame == null)
            {
                return null;
            }

            existingTeamGame.Start = TeamGameModel.Start;
            existingTeamGame.End = TeamGameModel.End;
            existingTeamGame.AwayTeamId = TeamGameModel.AwayTeamId;
            existingTeamGame.HomeTeamId = TeamGameModel.HomeTeamId;
            existingTeamGame.Result = TeamGameModel.Result;
            await _context.SaveChangesAsync();

            return existingTeamGame;
        }
        public async Task<TeamGame?> DeleteTeamGame(int id)
        {
            var TeamGameModel = await _context.TeamGames.FirstOrDefaultAsync(tg => tg.Id == id);

            if (TeamGameModel == null)
            {
                return null;
            }

            _context.TeamGames.Remove(TeamGameModel);
            await _context.SaveChangesAsync();
            return TeamGameModel;
        }
    }
}