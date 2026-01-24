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
public class EventController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly ITeamEventRepository _eventRepo;
    private readonly IPlayerTeamRepository _PlayerTeamRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<EventController> _logger;

    public EventController(PulsePitchDbContext context, ITeamEventRepository eventRepo, IPlayerTeamRepository PlayerTeamRepo, IMapper mapper, ILogger<EventController> logger)
    {
        _context = context;
        _eventRepo = eventRepo;
        _PlayerTeamRepo = PlayerTeamRepo;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<TeamEventDTO>>> GetAllTeamsEvent(int userId)
    {
        try
        {
            var events = await _eventRepo.GetAllEvent();
            var playerTeams = await _PlayerTeamRepo.GetAllPlayerTeams();
            var teamEventDtos = _mapper.Map<List<TeamEventDTO>>(events);

            var teams = playerTeams.Where(pt => pt.PlayerId == userId).ToList();
            var currentTeamEvents = teamEventDtos.Where(te => teams.Any(t => te.TeamId == t.TeamId)).ToList();

            return Ok(currentTeamEvents);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving team events for user {UserId}", userId);
            return StatusCode(500, new { message = "An error occurred while retrieving team events" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TeamEventDTO>> GetTeamsById(int id)
    {
        try
        {
            var ev = await _eventRepo.GetByIdEvent(id);
            if (ev == null)
                return NotFound($"Team event {id} not found");

            var eventDto = _mapper.Map<TeamEventDTO>(ev);
            return Ok(eventDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving team event {Id}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving team event" });
        }
    }

    [HttpPost]
    public async Task<ActionResult> CreateTeams([FromBody] TeamEventDTO teamDTO)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            TeamEvent Event = _mapper.Map<TeamEvent>(teamDTO);
            await _eventRepo.CreateEvent(Event);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating team event");
            return StatusCode(500, new { message = "An error occurred while creating team event" });
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> EditEvents([FromBody] TeamEvent teamEventDTO, int id)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            TeamEvent teamEvent = _mapper.Map<TeamEvent>(teamEventDTO);
            await _eventRepo.UpdateEvent(id, teamEvent);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error editing team event {Id}", id);
            return StatusCode(500, new { message = "An error occurred while editing team event" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTeams(int id)
    {
        try
        {
            await _eventRepo.DeleteEvent(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting team event {Id}", id);
            return StatusCode(500, new { message = "An error occurred while deleting team event" });
        }
    }
}