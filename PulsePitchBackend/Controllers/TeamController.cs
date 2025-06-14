using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulsePitch.Data;
using PulsePitch.Models;
using PulsePitch.DTO;
using PulsePitch.Interfaces;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace PulsePitch.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TeamController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly ITeamRepository _teamRepo;
    private readonly IMapper _mapper;

    public TeamController(PulsePitchDbContext context, ITeamRepository teamRepo, IMapper mapper)
    {
        _context = context;
        _teamRepo = teamRepo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TeamDTO>>> GetAllTeams()
    {
        var teams = await _teamRepo.GetAllTeams();
        var teamDtos = _mapper.Map<List<TeamDTO>>(teams);

        return Ok(teamDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TeamDTO>> GetTeamsById(int id)
    {
        var team = await _teamRepo.GetByIdTeams(id);
        if (team == null)
            return NotFound();

        var teamDto = _mapper.Map<TeamDTO>(team);

        return Ok(teamDto);
    }

    [HttpPost]
    public async Task<ActionResult> CreateTeams([FromBody] TeamDTO teamDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var coachId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (coachId == null)
        {
            return Unauthorized();
        }
        teamDTO.CoachId = coachId;

        Team team = _mapper.Map<Team>(teamDTO);

        await _teamRepo.CreateTeams(team);
        return Ok();
    }
    [HttpPatch("{id}")]
    public async Task<ActionResult> EditTeams([FromBody] EditTeamDTO teamDTO, int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        Team team = _mapper.Map<Team>(teamDTO);

        await _teamRepo.UpdateTeams(id, team);
        return Ok();
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTeams(int id)
    {
        await _teamRepo.DeleteTeams(id);
        return NoContent();
    }

    [HttpPost("joinTeam")]
    public async Task<ActionResult> JoinTeam([FromBody] JoinTeamDTO joinTeam)
    {
        try
        {
            if (joinTeam.PlayerId == 0 || joinTeam.TeamName == null || joinTeam.JoinCode == 0)
            {
                return StatusCode(500);
            }
            var result = await _teamRepo.JoinTeams(joinTeam);
            if (result == null)
            {
                return BadRequest(new { message = "Invalid team name or join code, or player already joined." });
            }
            return Ok();
        }
        catch (InvalidOperationException ex)
        {
                return BadRequest(new { message = ex.Message });
        }
    }
}