using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using PulsePitch.Interfaces;
using PulsePitch.DTO;
using AutoMapper;
using System.Security.Claims;

namespace PulsePitch.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IUserProfileRepository _userProfileRepo;
    private readonly ITeamRepository _teamRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<AdminController> _logger;

    public AdminController(
        UserManager<IdentityUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IUserProfileRepository userProfileRepo,
        ITeamRepository teamRepo,
        IMapper mapper,
        ILogger<AdminController> logger)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _userProfileRepo = userProfileRepo;
        _teamRepo = teamRepo;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<UserProfileDTO>>> GetAllUsers()
    {
        try
        {
            var users = await _userProfileRepo.GetUserProfile();
            var userDtos = _mapper.Map<List<UserProfileDTO>>(users);
            return Ok(userDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all users");
            return StatusCode(500, new { message = "An error occurred while retrieving users" });
        }
    }

    [HttpGet("users/{id}")]
    public async Task<ActionResult<UserProfileDTO>> GetUserById(int id)
    {
        try
        {
            var user = await _userProfileRepo.GetByIdUserProfile(id);
            if (user == null)
                return NotFound("User not found");

            var userDto = _mapper.Map<UserProfileDTO>(user);
            return Ok(userDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving user {UserId}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving user" });
        }
    }

    [HttpPut("users/{identityUserId}/roles")]
    public async Task<ActionResult> UpdateUserRoles(string identityUserId, [FromBody] UpdateUserRolesDTO dto)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(identityUserId);
            if (user == null)
                return NotFound("User not found");

            var currentRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, currentRoles);

            var validRoles = new[] { "Admin", "Manager", "Coach", "Player" };
            var rolesToAdd = dto.Roles.Where(r => validRoles.Contains(r)).ToList();

            if (rolesToAdd.Any())
            {
                foreach (var role in rolesToAdd)
                {
                    if (!await _roleManager.RoleExistsAsync(role))
                    {
                        await _roleManager.CreateAsync(new IdentityRole(role));
                    }
                }

                await _userManager.AddToRolesAsync(user, rolesToAdd);
            }

            return Ok(new { message = "User roles updated successfully", roles = rolesToAdd });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating roles for user {UserId}", identityUserId);
            return StatusCode(500, new { message = "An error occurred while updating user roles" });
        }
    }

    [HttpDelete("users/{id}")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        try
        {
            var userProfile = await _userProfileRepo.GetByIdUserProfile(id);
            if (userProfile == null)
                return NotFound("User not found");

            var identityUser = await _userManager.FindByIdAsync(userProfile.IdentityUserId);
            if (identityUser != null)
            {
                await _userManager.DeleteAsync(identityUser);
            }

            await _userProfileRepo.DeleteUserProfile(id);

            return Ok(new { message = "User deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting user {UserId}", id);
            return StatusCode(500, new { message = "An error occurred while deleting user" });
        }
    }

    [HttpGet("teams")]
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

    [HttpDelete("teams/{id}")]
    public async Task<ActionResult> DeleteTeam(int id)
    {
        try
        {
            var team = await _teamRepo.DeleteTeams(id);
            if (team == null)
                return NotFound("Team not found");

            return Ok(new { message = "Team deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting team {TeamId}", id);
            return StatusCode(500, new { message = "An error occurred while deleting team" });
        }
    }

    [HttpGet("analytics")]
    public async Task<ActionResult<AnalyticsDTO>> GetSystemAnalytics()
    {
        try
        {
            var allUsers = await _userProfileRepo.GetUserProfile();
            var allTeams = await _teamRepo.GetAllTeams();

            var userRoleCounts = new Dictionary<string, int>();
            foreach (var userProfile in allUsers)
            {
                var identityUser = await _userManager.FindByIdAsync(userProfile.IdentityUserId);
                if (identityUser != null)
                {
                    var roles = await _userManager.GetRolesAsync(identityUser);
                    foreach (var role in roles)
                    {
                        if (userRoleCounts.ContainsKey(role))
                            userRoleCounts[role]++;
                        else
                            userRoleCounts[role] = 1;
                    }
                }
            }

            var analytics = new AnalyticsDTO
            {
                TotalUsers = allUsers.Count,
                TotalTeams = allTeams.Count,
                UsersByRole = userRoleCounts,
                PublicTeams = allTeams.Count(t => t.IsPublic),
                PrivateTeams = allTeams.Count(t => !t.IsPublic)
            };

            return Ok(analytics);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving system analytics");
            return StatusCode(500, new { message = "An error occurred while retrieving analytics" });
        }
    }
}
