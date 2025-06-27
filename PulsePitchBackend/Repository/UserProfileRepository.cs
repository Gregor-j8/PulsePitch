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
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly PulsePitchDbContext _context;
        public UserProfileRepository(PulsePitchDbContext context)
        {
            _context = context;
        }


        public async Task<List<UserProfile>> GetUserProfile()
        {
            return await _context.UserProfiles.ToListAsync();
        }
        public async Task<UserProfile> GetByIdUserProfile(int id)
        {
            return await _context.UserProfiles.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<UserProfile?> DeleteUserProfile(int id)
        {
            var UserProfile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.Id == id);

            if (UserProfile == null)
            {
                return null;
            }

            _context.UserProfiles.Remove(UserProfile);
            await _context.SaveChangesAsync();
            return UserProfile;
        }

        public async Task<UserProfile?> UpdateUserProfile(int id, UserProfile userProfile)
        {
            var existingProfile = await _context.UserProfiles.FindAsync(id);

            if (existingProfile == null)
            {
                return null;
            }

            existingProfile.UserName = userProfile.UserName;
            existingProfile.Email = userProfile.Email;
            existingProfile.FirstName = userProfile.FirstName;
            existingProfile.LastName = userProfile.LastName;
            existingProfile = userProfile;
            await _context.SaveChangesAsync();

            return existingProfile;
        }
    }
}