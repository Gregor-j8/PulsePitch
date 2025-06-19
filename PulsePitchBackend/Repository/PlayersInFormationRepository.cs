using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Data;
using PulsePitch.Interfaces;
using PulsePitch.Models;
using Microsoft.EntityFrameworkCore;
using PulsePitch.DTO;
using Microsoft.AspNetCore.Http.HttpResults;

namespace PulsePitch.Repository
{
    public class PlayersInFormationRepository : IPlayersInFormationRepository
    {
        private readonly PulsePitchDbContext _context;
        public PlayersInFormationRepository(PulsePitchDbContext context)
        {
            _context = context;
        }

        public async Task<PlayersInFormation?> GetPlayersInFormationsById(int id)
        {
            PlayersInFormation formation = await _context.PlayersInFormation.FirstOrDefaultAsync(f => f.Id == id);
            if (formation == null)
            {
                return null;
            }

            return formation;
        }

        public async Task<PlayersInFormation> CreatePlayersInFormation(PlayersInFormation Playersformation)
        {
            if (Playersformation != null)
            {
                return null;
            }

            await _context.PlayersInFormation.AddRangeAsync(Playersformation);
            await _context.SaveChangesAsync();
            return Playersformation;
        }

        public async Task<PlayersInFormation?> EditPlayersInFormation(int id, PlayersInFormation Playersformation)
        {
            var existingPlayersformation = await _context.PlayersInFormation.FindAsync(id);

            if (existingPlayersformation == null)
            {
                return null;
            }

            existingPlayersformation.Name = Playersformation.Name;
            await _context.SaveChangesAsync();

            return existingPlayersformation;
        }

        public async Task<PlayersInFormation?> DeletePlayersInFormation(int id)
        {
            PlayersInFormation Playersformation = await _context.PlayersInFormation.FirstOrDefaultAsync(f => f.Id == id);

            if (Playersformation == null)
            {
                return null;
            }

            _context.PlayersInFormation.Remove(Playersformation);
            return Playersformation;
        }
    }
}