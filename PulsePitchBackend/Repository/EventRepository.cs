// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using PulsePitch.Data;
// using PulsePitch.Interfaces;
// using PulsePitch.Models;
// using Microsoft.EntityFrameworkCore;

// namespace PulsePitch.Repository
// {
//     public class EventRepository : IEventRepository
//     {
//         private readonly PulsePitchDbContext _context;
//         public EventRepository(PulsePitchDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<Team> CreateEvent(Team teamModel)
//         {
//             await _context.Teams.AddAsync(teamModel);
//             await _context.SaveChangesAsync();
//             return teamModel;
//         }

//         public async Task<Team?> DeleteEvent(int id)
//         {
//             var teamModel = await _context.Teams.FirstOrDefaultAsync(x => x.Id == id);

//             if (teamModel == null)
//             {
//                 return null;
//             }

//             _context.Teams.Remove(teamModel);
//             await _context.SaveChangesAsync();
//             return teamModel;
//         }

//         public async Task<List<Team>> GetAllEvent()
//         {
//             return await _context.Teams.ToListAsync();
//         }

//         public async Task<Team?> GetByIdEvent(int id)
//         {
//             return await _context.Teams.FirstOrDefaultAsync(c => c.Id == id);
//         }

//         public async Task<Team?> UpdateEvent(int id, Team teamModel)
//         {
//             var existingTeam = await _context.Teams.FindAsync(id);

//             if (existingTeam == null)
//             {
//                 return null;
//             }

//             existingTeam.Name = teamModel.Name;
//             existingTeam.JoinCode = teamModel.JoinCode;
//             await _context.SaveChangesAsync();

//             return existingTeam;
//         }
//     }
// }