using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Data;
using PulsePitch.Interfaces;
using PulsePitch.Models;
using PulsePitch.DTO;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace PulsePitch.Repository
{
    public class MatchRequestRepository : IMatchRequestRepository
    {
        private readonly IMapper _mapper;

        private readonly PulsePitchDbContext _context;
        public MatchRequestRepository(PulsePitchDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<MatchRequest>> GetAllMatchRequestByUserId(int id)
        {
            return await _context.MatchRequest.OrderByDescending(m => m.ProposedDate).Include(m => m.AwayTeam).Include(m => m.HomeTeam).Where(m => m.SenderId == id || m.RecieverId == id).ToListAsync();
        }
        public async Task<List<MatchRequest>> GetAllMatchRequestById(int id)
        {
            return await _context.MatchRequest.OrderByDescending(m => m.ProposedDate).Include(m => m.AwayTeam).Include(m => m.HomeTeam).Where(m => m.Id == id).ToListAsync();
        }
        public async Task<MatchRequest> CreateMatchRequest(MatchRequest matchRequestDTO)
        {
            if (matchRequestDTO == null)
            {
                return null;
            }
            await _context.MatchRequest.AddAsync(matchRequestDTO);
            await _context.SaveChangesAsync();

            return matchRequestDTO;
        }

        public async Task<MatchRequest> EditMatchRequest(int id, MatchRequestDTO MatchRequest)
        {
            var existingMatchRequest = await _context.MatchRequest.FirstOrDefaultAsync(m => m.Id == id);
            if (MatchRequest == null || existingMatchRequest == null)
            {
                return null;
            }
            existingMatchRequest.Message = MatchRequest.Message;
            await _context.SaveChangesAsync();
            return existingMatchRequest;
        }
        public async Task<MatchRequest> DeleteMatchRequestById(int id)
        {
            var MatchRequest = await _context.MatchRequest.FirstOrDefaultAsync(m => m.Id == id);
            if (MatchRequest == null)
            {
                return null;
            }
            _context.MatchRequest.Remove(MatchRequest);
            await _context.SaveChangesAsync();
            return MatchRequest;
        }
        public async Task<MatchRequest> ResponseMatchRequest(int id, MatchResponseDTO response)
        {
            var existingMatchRequest = await _context.MatchRequest.FirstOrDefaultAsync(m => m.Id == id);
            var editMatch = await _context.TeamGames.FirstOrDefaultAsync(t => existingMatchRequest.AwayTeamId == t.AwayTeamId
            && existingMatchRequest.HomeTeamId == t.HomeTeamId
            && existingMatchRequest.ProposedDate == t.Start);
            if (response == null || existingMatchRequest == null && editMatch != null)
            {
                return null;
            }
            existingMatchRequest.Status = response.Status;
            if (response.Status == "accepted")
            {
                editMatch.OnCalendar = true;
            }
            else
            {
                _context.Remove(editMatch);
            }
            await _context.SaveChangesAsync();
            return existingMatchRequest;
        }
    }
}