using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulsePitch.Data;
using PulsePitch.Models;
using PulsePitch.DTO;
using PulsePitch.Interfaces;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace PulsePitch.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TeamController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly PulsePitchDbContext _context;
    private readonly ITeamRepository _teamRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<TeamController> _logger;

    public TeamController(PulsePitchDbContext context, ITeamRepository teamRepo, IMapper mapper, UserManager<IdentityUser> userManager,
     RoleManager<IdentityRole> roleManager, ILogger<TeamController> logger)
    {
        _context = context;
        _teamRepo = teamRepo;
        _mapper = mapper;
        _userManager = userManager;
        _roleManager = roleManager;
        _logger = logger;
    }

    [HttpGet]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<IEnumerable<TeamDTO>>> GetAllTeams()
    {
        try
        {
            var teams = await _teamRepo.GetAllTeams();
            var teamDtos = _mapper.Map<List<TeamDTO>>(teams);
            return Ok(teamDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all teams");
            return StatusCode(500, new { message = "An error occurred while retrieving teams" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TeamDTO>> GetTeamsById(int id)
    {
        try
        {
            var team = await _teamRepo.GetByIdTeams(id);
            if (team == null)
                return NotFound($"Team {id} not found");

            var teamDto = _mapper.Map<TeamDTO>(team);
            return Ok(teamDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving team {Id}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving team" });
        }
    }

    [HttpPost]
    public async Task<ActionResult> CreateTeams([FromBody] TeamDTO teamDTO)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var coachId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (coachId == null)
            {
                return Unauthorized("Coach ID not found");
            }
            teamDTO.CoachId = coachId;

            var user = await _userManager.FindByIdAsync(coachId);
            if (user == null)
                return Unauthorized("User not found");

            if (!await _roleManager.RoleExistsAsync("Coach"))
            {
                await _roleManager.CreateAsync(new IdentityRole("Coach"));
            }
            if (!await _userManager.IsInRoleAsync(user, "Coach"))
            {
                await _userManager.AddToRoleAsync(user, "Coach");
            }

            Team team = _mapper.Map<Team>(teamDTO);
            await _teamRepo.CreateTeams(team);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating team");
            return StatusCode(500, new { message = "An error occurred while creating team" });
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> EditTeams([FromBody] EditTeamDTO teamDTO, int id)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Team team = _mapper.Map<Team>(teamDTO);
            await _teamRepo.UpdateTeams(id, team);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error editing team {Id}", id);
            return StatusCode(500, new { message = "An error occurred while editing team" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTeams(int id)
    {
        try
        {
            await _teamRepo.DeleteTeams(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting team {Id}", id);
            return StatusCode(500, new { message = "An error occurred while deleting team" });
        }
    }

    [HttpPost("joinTeam")]
    public async Task<ActionResult> JoinTeam([FromBody] JoinTeamDTO joinTeam)
    {
        try
        {
            if (joinTeam.PlayerId == 0 || joinTeam.TeamName == null || joinTeam.JoinCode == null)
            {
                return BadRequest("PlayerId, TeamName, and JoinCode are required");
            }

            var result = await _teamRepo.JoinTeams(joinTeam);
            if (result == null)
            {
                return BadRequest(new { message = "Invalid team name or join code, or player already joined" });
            }

            var userProfile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.Id == joinTeam.PlayerId);
            if (userProfile == null)
            {
                return NotFound("User profile not found");
            }

            var user = await _userManager.FindByIdAsync(userProfile.IdentityUserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!await _roleManager.RoleExistsAsync("Player"))
            {
                await _roleManager.CreateAsync(new IdentityRole("Player"));
            }

            if (!await _userManager.IsInRoleAsync(user, "Player"))
            {
                var addRoleResult = await _userManager.AddToRoleAsync(user, "Player");
                if (!addRoleResult.Succeeded)
                {
                    return BadRequest(new { message = "Failed to add role", errors = addRoleResult.Errors });
                }
            }

            return Ok();
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Invalid operation while joining team for player {PlayerId}", joinTeam.PlayerId);
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error joining team for player {PlayerId}", joinTeam.PlayerId);
            return StatusCode(500, new { message = "An error occurred while joining team" });
        }
    }
}