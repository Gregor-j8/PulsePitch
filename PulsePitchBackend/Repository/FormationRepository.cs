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

            var positions = GenerateFormationPositions(formation.Id, formation.Template ?? "4-4-2");
            _context.PlayersInFormation.AddRange(positions);
            await _context.SaveChangesAsync();

            return formation;
        }

        private List<PlayersInFormation> GenerateFormationPositions(int formationId, string template)
        {
            var positions = new List<PlayersInFormation>();
            var coords = GetFormationCoordinates(template);

            for (int i = 0; i < coords.Count && i < 22; i++)
            {
                var coord = coords[i];
                positions.Add(new PlayersInFormation
                {
                    FormationId = formationId,
                    PositionId = i + 1,
                    Name = (i + 1) > 11 ? ((i + 1) - 11).ToString() : (i + 1).ToString(),
                    Role = coord.Role,
                    Color = (i + 1) > 11 ? "#FF0000" : "#0000FF",
                    X = coord.X,
                    Y = coord.Y,
                    Note = ""
                });
            }
            return positions;
        }

        private List<(double X, double Y, string Role)> GetFormationCoordinates(string template)
        {
            return template switch
            {
                "4-3-3" => GetFormation433(),
                "3-5-2" => GetFormation352(),
                "5-3-2" => GetFormation532(),
                "4-2-3-1" => GetFormation4231(),
                _ => GetFormation442()
            };
        }

        private List<(double X, double Y, string Role)> GetFormation442()
        {
            // Team A (Blue) - 4-4-2
            var teamA = new List<(double X, double Y, string Role)>
            {
                (920, 344, "GK"),   // Goalkeeper
                (800, 122, "RB"),   // Right Back
                (800, 200, "CB"),   // Center Back
                (800, 433, "CB"),   // Center Back
                (800, 511, "LB"),   // Left Back
                (600, 161, "RM"),   // Right Mid
                (400, 316, "CM"),   // Center Mid
                (600, 472, "LM"),   // Left Mid
                (400, 83, "RW"),    // Right Wing
                (350, 316, "ST"),   // Striker
                (400, 650, "LW")    // Left Wing
            };

            // Team B (Red) - 4-4-2 (mirrored)
            var teamB = new List<(double X, double Y, string Role)>
            {
                (65, 350, "GK"),    // Goalkeeper
                (200, 511, "LB"),   // Left Back
                (200, 433, "CB"),   // Center Back
                (200, 300, "CB"),   // Center Back
                (200, 122, "RB"),   // Right Back
                (300, 316, "CM"),   // Center Mid
                (400, 472, "LM"),   // Left Mid
                (400, 161, "RM"),   // Right Mid
                (600, 550, "LW"),   // Left Wing
                (650, 316, "ST"),   // Striker
                (600, 183, "RW")    // Right Wing
            };

            teamA.AddRange(teamB);
            return teamA;
        }

        private List<(double X, double Y, string Role)> GetFormation433()
        {
            // Team A (Blue) - 4-3-3
            var teamA = new List<(double X, double Y, string Role)>
            {
                (920, 344, "GK"),   // Goalkeeper
                (800, 122, "RB"),   // Right Back
                (800, 250, "CB"),   // Center Back
                (800, 433, "CB"),   // Center Back
                (800, 511, "LB"),   // Left Back
                (550, 200, "CM"),   // Right Center Mid
                (550, 344, "CM"),   // Center Mid
                (550, 488, "CM"),   // Left Center Mid
                (350, 100, "RW"),   // Right Wing
                (350, 344, "ST"),   // Striker
                (350, 588, "LW")    // Left Wing
            };

            // Team B (Red) - 4-3-3 (mirrored)
            var teamB = new List<(double X, double Y, string Role)>
            {
                (65, 350, "GK"),    // Goalkeeper
                (200, 511, "LB"),   // Left Back
                (200, 433, "CB"),   // Center Back
                (200, 250, "CB"),   // Center Back
                (200, 122, "RB"),   // Right Back
                (450, 488, "CM"),   // Left Center Mid
                (450, 344, "CM"),   // Center Mid
                (450, 200, "CM"),   // Right Center Mid
                (650, 588, "LW"),   // Left Wing
                (650, 344, "ST"),   // Striker
                (650, 100, "RW")    // Right Wing
            };

            teamA.AddRange(teamB);
            return teamA;
        }

        private List<(double X, double Y, string Role)> GetFormation352()
        {
            // Team A (Blue) - 3-5-2
            var teamA = new List<(double X, double Y, string Role)>
            {
                (920, 344, "GK"),   // Goalkeeper
                (800, 200, "CB"),   // Right Center Back
                (800, 344, "CB"),   // Center Back
                (800, 488, "CB"),   // Left Center Back
                (600, 100, "RWB"),  // Right Wing Back
                (600, 244, "CM"),   // Right Center Mid
                (550, 344, "CM"),   // Center Mid
                (600, 444, "CM"),   // Left Center Mid
                (600, 588, "LWB"),  // Left Wing Back
                (350, 244, "ST"),   // Right Striker
                (350, 444, "ST")    // Left Striker
            };

            // Team B (Red) - 3-5-2 (mirrored)
            var teamB = new List<(double X, double Y, string Role)>
            {
                (65, 350, "GK"),    // Goalkeeper
                (200, 488, "CB"),   // Left Center Back
                (200, 344, "CB"),   // Center Back
                (200, 200, "CB"),   // Right Center Back
                (400, 588, "LWB"),  // Left Wing Back
                (400, 444, "CM"),   // Left Center Mid
                (450, 344, "CM"),   // Center Mid
                (400, 244, "CM"),   // Right Center Mid
                (400, 100, "RWB"),  // Right Wing Back
                (650, 444, "ST"),   // Left Striker
                (650, 244, "ST")    // Right Striker
            };

            teamA.AddRange(teamB);
            return teamA;
        }

        private List<(double X, double Y, string Role)> GetFormation532()
        {
            // Team A (Blue) - 5-3-2
            var teamA = new List<(double X, double Y, string Role)>
            {
                (920, 344, "GK"),   // Goalkeeper
                (800, 100, "RWB"),  // Right Wing Back
                (800, 222, "CB"),   // Right Center Back
                (800, 344, "CB"),   // Center Back
                (800, 466, "CB"),   // Left Center Back
                (800, 588, "LWB"),  // Left Wing Back
                (500, 222, "CM"),   // Right Center Mid
                (500, 344, "CM"),   // Center Mid
                (500, 466, "CM"),   // Left Center Mid
                (350, 244, "ST"),   // Right Striker
                (350, 444, "ST")    // Left Striker
            };

            // Team B (Red) - 5-3-2 (mirrored)
            var teamB = new List<(double X, double Y, string Role)>
            {
                (65, 350, "GK"),    // Goalkeeper
                (200, 588, "LWB"),  // Left Wing Back
                (200, 466, "CB"),   // Left Center Back
                (200, 344, "CB"),   // Center Back
                (200, 222, "CB"),   // Right Center Back
                (200, 100, "RWB"),  // Right Wing Back
                (500, 466, "CM"),   // Left Center Mid
                (500, 344, "CM"),   // Center Mid
                (500, 222, "CM"),   // Right Center Mid
                (650, 444, "ST"),   // Left Striker
                (650, 244, "ST")    // Right Striker
            };

            teamA.AddRange(teamB);
            return teamA;
        }

        private List<(double X, double Y, string Role)> GetFormation4231()
        {
            // Team A (Blue) - 4-2-3-1
            var teamA = new List<(double X, double Y, string Role)>
            {
                (920, 344, "GK"),   // Goalkeeper
                (800, 122, "RB"),   // Right Back
                (800, 250, "CB"),   // Center Back
                (800, 438, "CB"),   // Center Back
                (800, 566, "LB"),   // Left Back
                (600, 250, "CDM"),  // Right Defensive Mid
                (600, 438, "CDM"),  // Left Defensive Mid
                (450, 122, "RM"),   // Right Mid
                (450, 344, "CAM"),  // Center Attacking Mid
                (450, 566, "LM"),   // Left Mid
                (300, 344, "ST")    // Striker
            };

            // Team B (Red) - 4-2-3-1 (mirrored)
            var teamB = new List<(double X, double Y, string Role)>
            {
                (65, 350, "GK"),    // Goalkeeper
                (200, 566, "LB"),   // Left Back
                (200, 438, "CB"),   // Center Back
                (200, 250, "CB"),   // Center Back
                (200, 122, "RB"),   // Right Back
                (400, 438, "CDM"),  // Left Defensive Mid
                (400, 250, "CDM"),  // Right Defensive Mid
                (550, 566, "LM"),   // Left Mid
                (550, 344, "CAM"),  // Center Attacking Mid
                (550, 122, "RM"),   // Right Mid
                (700, 344, "ST")    // Striker
            };

            teamA.AddRange(teamB);
            return teamA;
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