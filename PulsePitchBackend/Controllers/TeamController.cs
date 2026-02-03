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
    private readonly ITeamAuthorizationService _authService;

    public TeamController(PulsePitchDbContext context, ITeamRepository teamRepo, IMapper mapper, UserManager<IdentityUser> userManager,
     RoleManager<IdentityRole> roleManager, ILogger<TeamController> logger, ITeamAuthorizationService authService)
    {
        _context = context;
        _teamRepo = teamRepo;
        _mapper = mapper;
        _userManager = userManager;
        _roleManager = roleManager;
        _logger = logger;
        _authService = authService;
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

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized("User ID not found");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return Unauthorized("User not found");

            if (!await _roleManager.RoleExistsAsync("Manager"))
            {
                await _roleManager.CreateAsync(new IdentityRole("Manager"));
            }
            if (!await _userManager.IsInRoleAsync(user, "Manager"))
            {
                await _userManager.AddToRoleAsync(user, "Manager");
            }

            Team team = _mapper.Map<Team>(teamDTO);
            await _teamRepo.CreateTeams(team, userId);
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

    [HttpGet("public")]
    [ResponseCache(Duration = 60)]
    public async Task<ActionResult<IEnumerable<PublicTeamSearchDTO>>> GetPublicTeams()
    {
        try
        {
            var teams = await _teamRepo.GetPublicTeams();

            var publicTeamDtos = teams.Select(t => new PublicTeamSearchDTO
            {
                Id = t.Id,
                Name = t.Name,
                ManagerNames = GetManagerNames(t.Id),
                CoachNames = GetCoachNames(t.Id),
                RequiresApproval = t.RequiresApproval,
                MemberCount = GetTeamMemberCount(t.Id)
            }).ToList();

            return Ok(publicTeamDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving public teams");
            return StatusCode(500, new { message = "An error occurred while retrieving public teams" });
        }
    }

    [HttpGet("public/search")]
    public async Task<ActionResult<IEnumerable<PublicTeamSearchDTO>>> SearchPublicTeams([FromQuery] string q)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(q))
                return BadRequest("Search term is required");

            var teams = await _teamRepo.SearchPublicTeams(q);

            var publicTeamDtos = teams.Select(t => new PublicTeamSearchDTO
            {
                Id = t.Id,
                Name = t.Name,
                ManagerNames = GetManagerNames(t.Id),
                CoachNames = GetCoachNames(t.Id),
                RequiresApproval = t.RequiresApproval,
                MemberCount = GetTeamMemberCount(t.Id)
            }).ToList();

            return Ok(publicTeamDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching public teams with term {SearchTerm}", q);
            return StatusCode(500, new { message = "An error occurred while searching public teams" });
        }
    }

    [HttpPost("request-join")]
    public async Task<ActionResult> RequestJoinTeam([FromBody] JoinRequestDTO request)
    {
        try
        {
            var result = await _teamRepo.RequestJoinTeam(request);

            var userProfile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.Id == request.PlayerId);
            if (userProfile != null)
            {
                var user = await _userManager.FindByIdAsync(userProfile.IdentityUserId);
                if (user != null)
                {
                    if (!await _roleManager.RoleExistsAsync("Player"))
                    {
                        await _roleManager.CreateAsync(new IdentityRole("Player"));
                    }

                    if (!await _userManager.IsInRoleAsync(user, "Player"))
                    {
                        await _userManager.AddToRoleAsync(user, "Player");
                    }
                }
            }

            return Ok(new
            {
                status = result.Status ?? "accepted",
                message = result.Status == "pending"
                    ? "Join request submitted for approval"
                    : "Successfully joined team"
            });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Invalid operation while requesting to join team {TeamId}", request.TeamId);
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error requesting to join team {TeamId}", request.TeamId);
            return StatusCode(500, new { message = "An error occurred while requesting to join team" });
        }
    }

    [HttpGet("{teamId}/pending-requests")]
    public async Task<ActionResult<IEnumerable<PendingJoinRequestDTO>>> GetPendingJoinRequests(int teamId)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var team = await _teamRepo.GetByIdTeams(teamId);

            if (team == null)
                return NotFound("Team not found");

            if (!await _authService.CanManageRoster(teamId, userId))
                return Forbid();

            var pendingRequests = await _teamRepo.GetPendingJoinRequests(teamId);
            var dtos = _mapper.Map<List<PendingJoinRequestDTO>>(pendingRequests);

            return Ok(dtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving pending join requests for team {TeamId}", teamId);
            return StatusCode(500, new { message = "An error occurred while retrieving pending requests" });
        }
    }

    [HttpPut("join-request/{playerTeamId}/respond")]
    public async Task<ActionResult> RespondToJoinRequest(int playerTeamId, [FromBody] JoinRequestResponseDTO response)
    {
        try
        {
            if (response.Status != "accepted" && response.Status != "rejected")
                return BadRequest("Status must be 'accepted' or 'rejected'");

            var playerTeam = await _context.PlayerTeams
                .Include(pt => pt.Team)
                .FirstOrDefaultAsync(pt => pt.Id == playerTeamId);

            if (playerTeam == null)
                return NotFound("Join request not found");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageRoster(playerTeam.TeamId, userId))
                return Forbid();

            var result = await _teamRepo.RespondToJoinRequest(playerTeamId, response);

            return Ok(new
            {
                status = result.Status,
                message = $"Join request {response.Status}"
            });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Invalid operation while responding to join request {PlayerTeamId}", playerTeamId);
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error responding to join request {PlayerTeamId}", playerTeamId);
            return StatusCode(500, new { message = "An error occurred while responding to join request" });
        }
    }

    [HttpPost("{teamId}/staff")]
    public async Task<ActionResult> AddTeamMember(int teamId, [FromBody] AddTeamMemberDTO dto)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageRoster(teamId, userId))
                return Forbid();

            var success = await _teamRepo.AddTeamMember(teamId, dto.UserProfileId, dto.Role);
            if (!success)
                return BadRequest(new { message = "User is already a member of this team" });

            return Ok(new { message = $"User added as {dto.Role}" });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Invalid operation while adding team member");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding team member to team {TeamId}", teamId);
            return StatusCode(500, new { message = "An error occurred while adding team member" });
        }
    }

    [HttpPut("{teamId}/staff/{userProfileId}/role")]
    public async Task<ActionResult> UpdateTeamMemberRole(int teamId, int userProfileId, [FromBody] UpdateTeamMemberRoleDTO dto)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageRoster(teamId, userId))
                return Forbid();

            var success = await _teamRepo.UpdateTeamMemberRole(teamId, userProfileId, dto.Role);
            if (!success)
                return NotFound(new { message = "Team member not found" });

            return Ok(new { message = $"Role updated to {dto.Role}" });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Invalid operation while updating team member role");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating team member role for team {TeamId}", teamId);
            return StatusCode(500, new { message = "An error occurred while updating team member role" });
        }
    }

    [HttpDelete("{teamId}/staff/{userProfileId}")]
    public async Task<ActionResult> RemoveTeamMember(int teamId, int userProfileId)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageRoster(teamId, userId))
                return Forbid();

            var success = await _teamRepo.RemoveTeamMember(teamId, userProfileId);
            if (!success)
                return NotFound(new { message = "Team member not found" });

            return Ok(new { message = "Team member removed" });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Invalid operation while removing team member");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error removing team member from team {TeamId}", teamId);
            return StatusCode(500, new { message = "An error occurred while removing team member" });
        }
    }

    [HttpGet("{teamId}/staff")]
    public async Task<ActionResult<TeamStaffDTO>> GetTeamStaff(int teamId)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.IsTeamMember(teamId, userId))
                return Forbid();

            var managers = await _teamRepo.GetTeamMembersByRole(teamId, "Manager");
            var coaches = await _teamRepo.GetTeamMembersByRole(teamId, "Coach");
            var players = await _teamRepo.GetTeamMembersByRole(teamId, "Player");

            var staffDto = new TeamStaffDTO
            {
                Managers = _mapper.Map<List<UserProfileDTO>>(managers),
                Coaches = _mapper.Map<List<UserProfileDTO>>(coaches),
                Players = _mapper.Map<List<UserProfileDTO>>(players)
            };

            return Ok(staffDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving team staff for team {TeamId}", teamId);
            return StatusCode(500, new { message = "An error occurred while retrieving team staff" });
        }
    }

    private List<string> GetStaffNames(int teamId, string role)
    {
        return _context.PlayerTeams
            .Where(pt => pt.TeamId == teamId && pt.Role == role)
            .Include(pt => pt.Player)
            .Select(pt => $"{pt.Player.FirstName} {pt.Player.LastName}")
            .ToList();
    }

    private List<string> GetManagerNames(int teamId) => GetStaffNames(teamId, "Manager");

    private List<string> GetCoachNames(int teamId) => GetStaffNames(teamId, "Coach");

    private int GetTeamMemberCount(int teamId)
    {
        return _context.PlayerTeams.Count(pt => pt.TeamId == teamId && pt.Status == null);
    }
}