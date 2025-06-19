using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.DTO;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface IPlayersInFormationRepository
    {
        Task<PlayersInFormation> GetPlayersInFormationsById(int id);
        Task<PlayersInFormation> CreatePlayersInFormation(PlayersInFormation PlayersInFormation);
        Task<PlayersInFormation> EditPlayersInFormation(int id, PlayersInFormation PlayersInFormation);
        Task<PlayersInFormation> DeletePlayersInFormation(int id);

    }
}