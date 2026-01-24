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
public class TeamGameController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly ITeamGameRepository _TeamGameRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<TeamGameController> _logger;

    public TeamGameController(PulsePitchDbContext context, ITeamGameRepository teamGame, IMapper mapper, ILogger<TeamGameController> logger)
    {
        _context = context;
        _TeamGameRepo = teamGame;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet("team")]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<IEnumerable<TeamGame>>> GetTeamGameByTeamId([FromQuery] string? home, [FromQuery] List<int> id)
    {
        try
        {
            var events = await _TeamGameRepo.GetTeamGameByTeamId(home, id);
            var teamGameDtos = _mapper.Map<List<TeamGame>>(events);
            return Ok(teamGameDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving team games for teams");
            return StatusCode(500, new { message = "An error occurred while retrieving team games" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TeamGame>> GetByIdTeamGame(int id)
    {
        try
        {
            var ev = await _TeamGameRepo.GetByIdTeamGame(id);
            if (ev == null)
                return NotFound($"Team game {id} not found");

            var gameDto = _mapper.Map<TeamGame>(ev);
            return Ok(gameDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving team game {Id}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving team game" });
        }
    }

    [HttpPost]
    public async Task<ActionResult> CreateTeamGame([FromBody] TeamGame teamDTO)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            TeamGame teamGame = _mapper.Map<TeamGame>(teamDTO);
            await _TeamGameRepo.CreateTeamGame(teamGame);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating team game");
            return StatusCode(500, new { message = "An error occurred while creating team game" });
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> UpdateTeamGame([FromBody] TeamGame teamGame, int id)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            TeamGame tg = _mapper.Map<TeamGame>(teamGame);
            await _TeamGameRepo.UpdateTeamGame(id, tg);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating team game {Id}", id);
            return StatusCode(500, new { message = "An error occurred while updating team game" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTeamGame(int id)
    {
        try
        {
            await _TeamGameRepo.DeleteTeamGame(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting team game {Id}", id);
            return StatusCode(500, new { message = "An error occurred while deleting team game" });
        }
    }
}