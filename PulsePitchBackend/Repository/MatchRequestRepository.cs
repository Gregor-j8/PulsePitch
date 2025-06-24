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
    public class MatchRequestRepository : IMatchRequestRepository
    {
        private readonly PulsePitchDbContext _context;
        public MatchRequestRepository(PulsePitchDbContext context)
        {
            _context = context;
        }
        public async Task<List<MatchRequest>> GetAllMatchRequestByUserId(int id)
        {
            return await _context.MatchRequest.Where(m => m.SenderId == id).ToListAsync();
        }
        public async Task<List<MatchRequest>> GetAllMatchRequestById(int id)
        {
            return await _context.MatchRequest.Where(m => m.Id == id).ToListAsync();
        }
        public async Task<MatchRequest> CreateMatchRequest(MatchRequest MatchRequest)
        {
            if (MatchRequest == null)
            {
                return null;
            }
            await _context.MatchRequest.AddAsync(MatchRequest);
            await _context.SaveChangesAsync();
            return MatchRequest;
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
            if (response == null || existingMatchRequest == null)
            {
                return null;
            }
            existingMatchRequest.Status = response.Status;
            await _context.SaveChangesAsync();
            return existingMatchRequest;
        }
    }
}