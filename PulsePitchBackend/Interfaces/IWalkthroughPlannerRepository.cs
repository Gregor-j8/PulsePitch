using PulsePitchBackend.Models;

namespace PulsePitchBackend.Interfaces;

public interface IWalkthroughPlannerRepository
{
    Task<List<WalkthroughPlanner>> GetWalkthroughsByFormationId(int formationId);
    Task<WalkthroughPlanner?> GetWalkthroughById(int id);
    Task<WalkthroughPlanner> CreateWalkthrough(WalkthroughPlanner walkthrough);
    Task<WalkthroughPlanner?> UpdateWalkthrough(int id, WalkthroughPlanner walkthrough);
    Task<WalkthroughPlanner?> DeleteWalkthrough(int id);
}
