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
public class PlayerTeamController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IPlayerTeamRepository _playerTeamRepo;
    private readonly IMapper _mapper;

    public PlayerTeamController(PulsePitchDbContext context, IPlayerTeamRepository playerTeamRepo, IMapper mapper)
    {
        _context = context;
        _playerTeamRepo = playerTeamRepo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlayerTeamDTO>>> GetAllTeams()
    {
        var playerTeams = await _playerTeamRepo.GetAllPlayerTeams();
        var playerTeamsDtos = _mapper.Map<List<PlayerTeamDTO>>(playerTeams);

        return Ok(playerTeamsDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PlayerTeamDTO>> GetTeamsById(int id)
    {
        var Playerteam = await _playerTeamRepo.GetByIdPlayerTeams(id);
        if (Playerteam == null)
            return NotFound();

        var playerTeamsDto = _mapper.Map<PlayerTeamDTO>(Playerteam);

        return Ok(playerTeamsDto);
    }

    [HttpPost]
    public async Task<ActionResult> CreateTeams([FromBody] PlayerTeamDTO payerTeamDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        PlayerTeam playerteam = _mapper.Map<PlayerTeam>(payerTeamDTO);

        await _playerTeamRepo.CreatePlayerTeams(playerteam);
        return Ok();
    }
    [HttpPatch("{id}")]
    public async Task<ActionResult> EditTeams([FromBody] PlayerTeamDTO PlayerteamDTO, int id)
    {
        if (!ModelState.IsValid)
        return BadRequest(ModelState);

        PlayerTeam playerTeam = _mapper.Map<PlayerTeam>(PlayerteamDTO);

        await _playerTeamRepo.UpdatePlayerTeams(id, playerTeam);
        return Ok();
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTeams(int id)
    {
        await _playerTeamRepo.DeletePlayerTeams(id);
        return NoContent();
    }
}