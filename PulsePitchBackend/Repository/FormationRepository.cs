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
    public class FormationRepository : IFormationRepository
    {
        private readonly PulsePitchDbContext _context;
        public FormationRepository(PulsePitchDbContext context)
        {
            _context = context;
        }

        public async Task<List<Formations>> GetAllFormations(int id)
        {
            List<Formations> formations = await _context.Formations.Include(f => f.Players).Where(f => f.TeamId == id).ToListAsync();
            return formations;
        }

        public async Task<Formations?> GetFormationsById(int id)
        {
            Formations formation = await _context.Formations.Include(f => f.Players).FirstOrDefaultAsync(f => f.Id == id);
            if (formation == null)
            {
                return null;
            }

            return formation;
        }

        public async Task<Formations> CreateFormation(Formations formation)
        {
            if (formation != null)
            {
                return null;
            }

            await _context.Formations.AddRangeAsync(formation);
            await _context.SaveChangesAsync();
            return formation;
        }

        public async Task<Formations?> EditFormation(int id, EditFormationDTO formation)
        {
            var existingFormation = await _context.Formations.FindAsync(id);

            if (existingFormation == null)
            {
                return null;
            }

            existingFormation.Name = formation.Name;
            await _context.SaveChangesAsync();

            return existingFormation;
        }

        public async Task<Formations?> DeleteFormation(int id)
        {
            Formations formation = await _context.Formations.FirstOrDefaultAsync(f => f.Id == id);

            if (formation == null)
            {
                return null;
            }

            _context.Formations.Remove(formation);
            return formation;
        }
    }
}