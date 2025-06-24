using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.DTO;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface IMatchRequestRepository
    {
        Task<List<MatchRequest>> GetAllMatchRequestByUserId(int id);
        Task<List<MatchRequest>> GetAllMatchRequestById(int id);
        Task<MatchRequest> CreateMatchRequest(MatchRequest MessageData);
        Task<MatchRequest> EditMatchRequest(int id, MatchRequestDTO MessageData);
        Task<MatchRequest> DeleteMatchRequestById(int id);
        Task<MatchRequest> ResponseMatchRequest(int id, MatchResponseDTO response);
    }
}