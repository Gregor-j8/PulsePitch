using Microsoft.AspNetCore.Mvc;
using PulsePitch.Data;
using PulsePitch.Interfaces;
using PulsePitchBackend.Models;
using PulsePitchBackend.DTOs.WalkthroughPlanners;
using PulsePitchBackend.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text.Json;

namespace PulsePitchBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class WalkthroughPlannersController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IWalkthroughPlannerRepository _walkthroughRepo;
    private readonly IFormationRepository _formationRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<WalkthroughPlannersController> _logger;
    private readonly ITeamAuthorizationService _authService;

    public WalkthroughPlannersController(
        PulsePitchDbContext context,
        IWalkthroughPlannerRepository walkthroughRepo,
        IFormationRepository formationRepo,
        IMapper mapper,
        ILogger<WalkthroughPlannersController> logger,
        ITeamAuthorizationService authService)
    {
        _context = context;
        _walkthroughRepo = walkthroughRepo;
        _formationRepo = formationRepo;
        _mapper = mapper;
        _logger = logger;
        _authService = authService;
    }

    [HttpGet("formation/{formationId}")]
    public async Task<ActionResult<IEnumerable<WalkthroughPlannerDTO>>> GetWalkthroughsByFormationId(int formationId)
    {
        try
        {
            var formation = await _formationRepo.GetFormationsById(formationId);
            if (formation == null)
                return NotFound($"Formation {formationId} not found");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageFormations(formation.TeamId, userId))
                return Forbid();

            var walkthroughs = await _walkthroughRepo.GetWalkthroughsByFormationId(formationId);
            var walkthroughDtos = _mapper.Map<List<WalkthroughPlannerDTO>>(walkthroughs);
            return Ok(walkthroughDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving walkthroughs for formation {FormationId}", formationId);
            return StatusCode(500, new { message = "An error occurred while retrieving walkthroughs" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<WalkthroughPlannerDTO>> GetWalkthroughById(int id)
    {
        try
        {
            var walkthrough = await _walkthroughRepo.GetWalkthroughById(id);
            if (walkthrough == null)
                return NotFound($"Walkthrough {id} not found");

            var formation = await _formationRepo.GetFormationsById(walkthrough.FormationId);
            if (formation == null)
                return NotFound($"Formation {walkthrough.FormationId} not found");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageFormations(formation.TeamId, userId))
                return Forbid();

            var walkthroughDto = _mapper.Map<WalkthroughPlannerDTO>(walkthrough);
            return Ok(walkthroughDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving walkthrough {WalkthroughId}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving the walkthrough" });
        }
    }

    [HttpPost]
    public async Task<ActionResult<WalkthroughPlannerDTO>> CreateWalkthrough([FromBody] WalkthroughPlannerDTO walkthroughDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var formation = await _formationRepo.GetFormationsById(walkthroughDto.FormationId);
            if (formation == null)
                return NotFound($"Formation {walkthroughDto.FormationId} not found");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageFormations(formation.TeamId, userId))
                return Forbid();

            var walkthrough = _mapper.Map<WalkthroughPlanner>(walkthroughDto);
            var newWalkthrough = await _walkthroughRepo.CreateWalkthrough(walkthrough);
            var resultDto = _mapper.Map<WalkthroughPlannerDTO>(newWalkthrough);

            return CreatedAtAction(nameof(GetWalkthroughById), new { id = newWalkthrough.Id }, resultDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating walkthrough");
            return StatusCode(500, new { message = "An error occurred while creating the walkthrough" });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<WalkthroughPlannerDTO>> UpdateWalkthrough(int id, [FromBody] WalkthroughPlannerDTO walkthroughDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingWalkthrough = await _walkthroughRepo.GetWalkthroughById(id);
            if (existingWalkthrough == null)
                return NotFound($"Walkthrough {id} not found");

            var formation = await _formationRepo.GetFormationsById(existingWalkthrough.FormationId);
            if (formation == null)
                return NotFound($"Formation {existingWalkthrough.FormationId} not found");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageFormations(formation.TeamId, userId))
                return Forbid();

            var walkthrough = _mapper.Map<WalkthroughPlanner>(walkthroughDto);
            var updatedWalkthrough = await _walkthroughRepo.UpdateWalkthrough(id, walkthrough);

            if (updatedWalkthrough == null)
                return NotFound($"Walkthrough {id} not found");

            var resultDto = _mapper.Map<WalkthroughPlannerDTO>(updatedWalkthrough);
            return Ok(resultDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating walkthrough {WalkthroughId}", id);
            return StatusCode(500, new { message = "An error occurred while updating the walkthrough" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteWalkthrough(int id)
    {
        try
        {
            var walkthrough = await _walkthroughRepo.GetWalkthroughById(id);
            if (walkthrough == null)
                return NotFound($"Walkthrough {id} not found");

            var formation = await _formationRepo.GetFormationsById(walkthrough.FormationId);
            if (formation == null)
                return NotFound($"Formation {walkthrough.FormationId} not found");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageFormations(formation.TeamId, userId))
                return Forbid();

            await _walkthroughRepo.DeleteWalkthrough(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting walkthrough {WalkthroughId}", id);
            return StatusCode(500, new { message = "An error occurred while deleting the walkthrough" });
        }
    }
}
