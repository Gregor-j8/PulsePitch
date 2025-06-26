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

        

        public async Task<List<Formations>> GetAllFormations(List<int> id)
        {
            List<Formations> formations = await _context.Formations.Include(f => f.Players).Where(f => id.Any(id => f.TeamId == id)).ToListAsync();
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
            if (formation == null)
            {
                return null;
            }

             _context.Formations.Add(formation);
            await _context.SaveChangesAsync();

             var positions = new List<PlayersInFormation>();
            for (int i = 1; i <= 22; i++)
            {
                double x = 0.0, y = 0.0;
                  if (i <= 11)
                {
                    switch (i)
                    {
                        case 1:  x = 920; y = 344; break;
                        case 2:  x = 800;  y = 122; break;
                        case 3:  x = 800;  y = 200; break;
                        case 4:  x = 800;  y = 433; break;
                        case 5:  x = 800;  y = 511; break;
                        case 6:  x = 400;  y = 316; break;
                        case 7:  x = 600;  y = 161; break;
                        case 8:  x = 600;  y = 472; break;
                        case 9:  x = 400;  y = 83; break;
                        case 10: x = 350;  y = 316; break;
                        case 11: x = 400;  y = 650; break;
                    }
                }
                else
                {
                    switch (i - 11)
                    {
                        case 1:  x = 65;   y = 350; break;
                        case 2:  x = 200;  y = 511; break;
                        case 3:  x = 200;  y = 433; break;
                        case 4:  x = 200;  y = 300; break;
                        case 5:  x = 200;  y = 122; break;
                        case 6:  x = 300;  y = 316; break;
                        case 7:  x = 400;  y = 472; break;
                        case 8:  x = 400;  y = 161; break;
                        case 9:  x = 600;  y = 550; break;
                        case 10: x = 650;  y = 316; break;
                        case 11: x = 600;  y = 183; break;
                    }
                }
                positions.Add(new PlayersInFormation
                {
                    FormationId = formation.Id,
                    PositionId = i,
                    Name = i > 11 ? (i - 11).ToString() : i.ToString(),
                    Role = "TBD",
                    Color = i > 11 ? "#FF0000" : "#0000FF",
                    X = x,
                    Y = y,
                    Note = ""
                });
            }
            _context.PlayersInFormation.AddRange(positions);
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
            existingFormation.Description = formation.Description;
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
            await _context.SaveChangesAsync();
            return formation;
        }
    }
}