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
public class PlayerTeamController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IPlayerTeamRepository _playerTeamRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<PlayerTeamController> _logger;

    public PlayerTeamController(PulsePitchDbContext context, IPlayerTeamRepository playerTeamRepo, IMapper mapper, ILogger<PlayerTeamController> logger)
    {
        _context = context;
        _playerTeamRepo = playerTeamRepo;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<IEnumerable<PlayerTeamDTO>>> GetAllTeams()
    {
        try
        {
            var playerTeams = await _playerTeamRepo.GetAllPlayerTeams();
            var playerTeamsDtos = _mapper.Map<List<PlayerTeamDTO>>(playerTeams);
            return Ok(playerTeamsDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all player teams");
            return StatusCode(500, new { message = "An error occurred while retrieving player teams" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<PlayerTeamDTO>>> GetTeamsById(int id)
    {
        try
        {
            var Playerteam = await _playerTeamRepo.GetByIdPlayerTeams(id);
            if (Playerteam == null)
                return NotFound($"Player team {id} not found");

            var playerTeamsDto = _mapper.Map<List<PlayerTeamDTO>>(Playerteam);
            return Ok(playerTeamsDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving player team {Id}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving player team" });
        }
    }

    [HttpPost]
    public async Task<ActionResult> CreateTeams([FromBody] PlayerTeamDTO payerTeamDTO)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            PlayerTeam playerteam = _mapper.Map<PlayerTeam>(payerTeamDTO);
            await _playerTeamRepo.CreatePlayerTeams(playerteam);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating player team");
            return StatusCode(500, new { message = "An error occurred while creating player team" });
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> EditTeams([FromBody] PlayerTeamDTO PlayerteamDTO, int id)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            PlayerTeam playerTeam = _mapper.Map<PlayerTeam>(PlayerteamDTO);
            await _playerTeamRepo.UpdatePlayerTeams(id, playerTeam);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error editing player team {Id}", id);
            return StatusCode(500, new { message = "An error occurred while editing player team" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<PlayerTeamDTO>> DeleteTeams(int id)
    {
        try
        {
            await _playerTeamRepo.DeletePlayerTeams(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting player team {Id}", id);
            return StatusCode(500, new { message = "An error occurred while deleting player team" });
        }
    }

    [HttpGet("player/{id}")]
    public async Task<ActionResult<List<GetTeamsByPlayerIdDTO>>> GetTeamsByPlayerId(int id)
    {
        try
        {
            List<PlayerTeam> teams = await _playerTeamRepo.GetTeamsByPlayerId(id);
            if (teams.Count == 0)
                return NotFound($"No teams found for player {id}");

            List<GetTeamsByPlayerIdDTO> teamsDto = _mapper.Map<List<GetTeamsByPlayerIdDTO>>(teams);
            return Ok(teamsDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving teams for player {PlayerId}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving player's teams" });
        }
    }
}