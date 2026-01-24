using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulsePitch.Data;
using PulsePitch.Models;
using PulsePitch.DTO;
using PulsePitch.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace PulsePitch.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserProfileController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IUserProfileRepository _UserProfileRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<UserProfileController> _logger;

    public UserProfileController(PulsePitchDbContext context, IUserProfileRepository UserProfileRepo, IMapper mapper, ILogger<UserProfileController> logger)
    {
        _context = context;
        _UserProfileRepo = UserProfileRepo;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<UserProfileDTO>> GetUserProfiles()
    {
        try
        {
            var userProfile = await _UserProfileRepo.GetUserProfile();
            var userProfileDTO = _mapper.Map<List<UserProfileDTO>>(userProfile);
            return Ok(userProfileDTO);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all user profiles");
            return StatusCode(500, new { message = "An error occurred while retrieving user profiles" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserProfileDTO>> GetByIdUserProfile(int id)
    {
        try
        {
            var userProfile = await _UserProfileRepo.GetByIdUserProfile(id);
            if (userProfile == null)
                return NotFound($"User profile {id} not found");

            var userProfileDTO = _mapper.Map<UserProfileDTO>(userProfile);
            return Ok(userProfileDTO);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving user profile {Id}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving user profile" });
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<UserProfileDTO>> UpdateUserProfile([FromBody] UserProfile UserProfile, int id)
    {
        try
        {
            if (UserProfile == null)
                return BadRequest("User profile data is required");

            var userProfile = await _UserProfileRepo.UpdateUserProfile(id, UserProfile);
            var userProfileDTO = _mapper.Map<UserProfileDTO>(userProfile);
            return Ok(userProfileDTO);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user profile {Id}", id);
            return StatusCode(500, new { message = "An error occurred while updating user profile" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<UserProfile>> DeleteUserProfile(int id)
    {
        try
        {
            await _UserProfileRepo.DeleteUserProfile(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting user profile {Id}", id);
            return StatusCode(500, new { message = "An error occurred while deleting user profile" });
        }
    }
}