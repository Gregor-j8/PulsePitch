using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface IUserProfileRepository
    {
        Task<List<UserProfile?>> GetUserProfile();
        Task<UserProfile?> GetByIdUserProfile(int id);
        Task<UserProfile?> UpdateUserProfile(int id, UserProfile UserProfile);
        Task<UserProfile?> DeleteUserProfile(int id);
    }
}