using PulsePitch.Data;
using PulsePitchBackend.Interfaces;
using PulsePitchBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace PulsePitchBackend.Repository;

public class WalkthroughPlannerRepository : IWalkthroughPlannerRepository
{
    private readonly PulsePitchDbContext _context;

    public WalkthroughPlannerRepository(PulsePitchDbContext context)
    {
        _context = context;
    }

    public async Task<List<WalkthroughPlanner>> GetWalkthroughsByFormationId(int formationId)
    {
        return await _context.WalkthroughPlanners
            .Where(w => w.FormationId == formationId)
            .OrderByDescending(w => w.UpdatedAt)
            .ToListAsync();
    }

    public async Task<WalkthroughPlanner?> GetWalkthroughById(int id)
    {
        return await _context.WalkthroughPlanners
            .Include(w => w.Formation)
            .FirstOrDefaultAsync(w => w.Id == id);
    }

    public async Task<WalkthroughPlanner> CreateWalkthrough(WalkthroughPlanner walkthrough)
    {
        walkthrough.CreatedAt = DateTime.UtcNow;
        walkthrough.UpdatedAt = DateTime.UtcNow;

        _context.WalkthroughPlanners.Add(walkthrough);
        await _context.SaveChangesAsync();

        return walkthrough;
    }

    public async Task<WalkthroughPlanner?> UpdateWalkthrough(int id, WalkthroughPlanner walkthrough)
    {
        var existingWalkthrough = await _context.WalkthroughPlanners.FindAsync(id);

        if (existingWalkthrough == null)
        {
            return null;
        }

        existingWalkthrough.Name = walkthrough.Name;
        existingWalkthrough.Description = walkthrough.Description;
        existingWalkthrough.Duration = walkthrough.Duration;
        existingWalkthrough.TimelineData = walkthrough.TimelineData;
        existingWalkthrough.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return existingWalkthrough;
    }

    public async Task<WalkthroughPlanner?> DeleteWalkthrough(int id)
    {
        var walkthrough = await _context.WalkthroughPlanners.FindAsync(id);

        if (walkthrough == null)
        {
            return null;
        }

        _context.WalkthroughPlanners.Remove(walkthrough);
        await _context.SaveChangesAsync();

        return walkthrough;
    }
}
