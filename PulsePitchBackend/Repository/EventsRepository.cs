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
    public class EventsRepository : IEventRepository
    {
        private readonly PulsePitchDbContext _context;
        public EventsRepository(PulsePitchDbContext context)
        {
            _context = context;
        }


        public async Task<List<Events>> GetAllEvents()
        {
            return await _context.Events.ToListAsync();
        }
    }
}