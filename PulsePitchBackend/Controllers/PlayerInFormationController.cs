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
public class PlayersInFormationsController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IPlayersInFormationRepository _PlayersInFormationRepo;
    private readonly IMapper _mapper;

    public PlayersInFormationsController(PulsePitchDbContext context, IPlayersInFormationRepository PlayersInFormationRepo, IMapper mapper)
    {
        _context = context;
        _PlayersInFormationRepo = PlayersInFormationRepo;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<PlayerTeamDTO>>> GetTeamsById(int id)
    {
        var Playerteam = await _PlayersInFormationRepo.GetPlayersInFormationsById(id);
        if (Playerteam == null)
            return NotFound();

        var playerTeamsDto = _mapper.Map<List<PlayerTeamDTO>>(Playerteam);

        return Ok(playerTeamsDto);
    }

    [HttpPost]
    public async Task<ActionResult> CreateTeams([FromBody] PlayersInFormation PlayerDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        PlayersInFormation player = _mapper.Map<PlayersInFormation>(PlayerDTO);

        await _PlayersInFormationRepo.CreatePlayersInFormation(player);
        return Ok();
    }
    
    [HttpPatch("{id}")]
    public async Task<ActionResult> EditFormation([FromBody] PlayersInFormation PlayerDto, int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _PlayersInFormationRepo.EditPlayersInFormation(id, PlayerDto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<FormationsDTO>> DeleteTeams(int id)
    {
        await _PlayersInFormationRepo.DeletePlayersInFormation(id);
        return NoContent();
    }
}