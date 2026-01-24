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
public class PlayersInFormationsController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IPlayersInFormationRepository _PlayersInFormationRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<PlayersInFormationsController> _logger;

    public PlayersInFormationsController(PulsePitchDbContext context, IPlayersInFormationRepository PlayersInFormationRepo, IMapper mapper, ILogger<PlayersInFormationsController> logger)
    {
        _context = context;
        _PlayersInFormationRepo = PlayersInFormationRepo;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PlayersInFormationDTO>> GetPlayersInFormationsById(int id)
    {
        try
        {
            var PlayersInFormation = await _PlayersInFormationRepo.GetPlayersInFormationsById(id);
            if (PlayersInFormation == null)
                return NotFound($"Player in formation {id} not found");

            var PlayersInFormationDto = _mapper.Map<PlayersInFormationDTO>(PlayersInFormation);
            return Ok(PlayersInFormationDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving player in formation {Id}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving player in formation" });
        }
    }

    [HttpGet("formation/{id}")]
    public async Task<ActionResult<IEnumerable<PlayersInFormationDTO>>> GetPlayersByFormationId(int id)
    {
        try
        {
            var PlayersInFormation = await _PlayersInFormationRepo.GetPlayersByFormationId(id);
            if (PlayersInFormation == null)
                return NotFound($"No players found for formation {id}");

            var PlayersInFormationDto = _mapper.Map<List<PlayersInFormationDTO>>(PlayersInFormation);
            return Ok(PlayersInFormationDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving players for formation {FormationId}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving players" });
        }
    }

    [HttpPost]
    public async Task<ActionResult> CreateTeams([FromBody] PlayersInFormation PlayerDTO)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            PlayersInFormation player = _mapper.Map<PlayersInFormation>(PlayerDTO);
            await _PlayersInFormationRepo.CreatePlayersInFormation(player);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating player in formation");
            return StatusCode(500, new { message = "An error occurred while creating player in formation" });
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> EditFormation([FromBody] PlayersInFormation PlayerDto, int id)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _PlayersInFormationRepo.EditPlayersInFormation(id, PlayerDto);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error editing player in formation {Id}", id);
            return StatusCode(500, new { message = "An error occurred while editing player in formation" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<FormationsDTO>> DeleteTeams(int id)
    {
        try
        {
            await _PlayersInFormationRepo.DeletePlayersInFormation(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting player in formation {Id}", id);
            return StatusCode(500, new { message = "An error occurred while deleting player in formation" });
        }
    }
}