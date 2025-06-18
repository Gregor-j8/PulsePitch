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
public class TeamGameController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly ITeamGameRepository _TeamGameRepo;
    private readonly IMapper _mapper;

    public TeamGameController(PulsePitchDbContext context, ITeamGameRepository teamGame, IMapper mapper)
    {
        _context = context;
        _TeamGameRepo = teamGame;
        _mapper = mapper;
    }

    [HttpGet("team")]
    public async Task<ActionResult<IEnumerable<TeamGame>>> GetTeamGameByTeamId([FromQuery] string? home, [FromQuery] List<int> id)
    {
        var events = await _TeamGameRepo.GetTeamGameByTeamId(home, id);
        var teamGameDtos = _mapper.Map<List<TeamGame>>(events);


        return Ok(teamGameDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TeamGame>> GetByIdTeamGame(int id)
    {
        var ev = await _TeamGameRepo.GetByIdTeamGame(id);
        if (ev == null)
            return NotFound();

        var gameDto = _mapper.Map<TeamGame>(ev);

        return Ok(gameDto);
    }

    [HttpPost]
    public async Task<ActionResult> CreateTeamGame([FromBody] TeamGame teamDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        TeamGame teamGame = _mapper.Map<TeamGame>(teamDTO);

        await _TeamGameRepo.CreateTeamGame(teamGame);
        return Ok();
    }
    [HttpPatch("{id}")]
    public async Task<ActionResult> UpdateTeamGame([FromBody] TeamGame teamGame, int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        TeamGame tg = _mapper.Map<TeamGame>(teamGame);

        await _TeamGameRepo.UpdateTeamGame(id, tg);
        return Ok();
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTeamGame(int id)
    {
        await _TeamGameRepo.DeleteTeamGame(id);
        return NoContent();
    }
}