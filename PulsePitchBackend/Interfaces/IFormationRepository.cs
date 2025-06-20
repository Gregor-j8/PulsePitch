using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.DTO;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface IFormationRepository
    {
        Task<List<Formations>> GetAllFormations(List<int> id);
        Task<Formations> GetFormationsById(int id);
        Task<Formations> CreateFormation(Formations formation);
        Task<Formations> EditFormation(int id, EditFormationDTO editFormation);
        Task<Formations> DeleteFormation(int id);

    }
}