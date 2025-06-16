using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulsePitch.Data;
using PulsePitch.Models;
using PulsePitch.DTO;
using PulsePitch.Interfaces;
using AutoMapper;

namespace PulsePitch.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserProfileController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IUserProfileRepository _UserProfileRepo;
    private readonly IMapper _mapper;

    public UserProfileController(PulsePitchDbContext context, IUserProfileRepository UserProfileRepo, IMapper mapper)
    {
        _context = context;
        _UserProfileRepo = UserProfileRepo;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserProfileDTO>> GetByIdUserProfile(int id)
    {
        var userProfile = await _UserProfileRepo.GetByIdUserProfile(id);
        var userProfileDTO = _mapper.Map<UserProfileDTO>(userProfile);

        return Ok(userProfileDTO);
    }
    [HttpPatch("{id}")]
    public async Task<ActionResult<UserProfileDTO>> UpdateUserProfile([FromBody] UserProfile UserProfile, int id)
    {
        var userProfile = await _UserProfileRepo.UpdateUserProfile(id, UserProfile);
        var userProfileDTO = _mapper.Map<UserProfileDTO>(userProfile);

        return Ok(userProfileDTO);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<UserProfile>> DeleteUserProfile(int id)
    {
        await _UserProfileRepo.DeleteUserProfile(id);
        return NoContent();
    }
}