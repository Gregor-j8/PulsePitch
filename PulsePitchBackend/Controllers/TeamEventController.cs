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
public class EventController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IEventRepository _eventRepo;
    private readonly IMapper _mapper;

    public EventController(PulsePitchDbContext context, IEventRepository eventRepo, IMapper mapper)
    {
        _context = context;
        _eventRepo = eventRepo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TeamEventDTO>>> GetAllTeamsEvent()
    {
        var events = await _eventRepo.GetAllEvent();
        var teamEventDtos = _mapper.Map<List<TeamEventDTO>>(events);

        return Ok(teamEventDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TeamEventDTO>> GetTeamsById(int id)
    {
        var ev = await _eventRepo.GetByIdEvent(id);
        if (ev == null)
            return NotFound();

        var eventDto = _mapper.Map<TeamEventDTO>(ev);

        return Ok(eventDto);
    }

    [HttpPost]
    public async Task<ActionResult> CreateTeams([FromBody] TeamEventDTO teamDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        TeamEvent Event = _mapper.Map<TeamEvent>(teamDTO);

        await _eventRepo.CreateEvent(Event);
        return Ok();
    }
    [HttpPatch("{id}")]
    public async Task<ActionResult> EditEvents([FromBody] EditTeamDTO teamEventDTO, int id)
    {
        if (!ModelState.IsValid)
        return BadRequest(ModelState);

        TeamEvent teamEvent = _mapper.Map<TeamEvent>(teamEventDTO);

        await _eventRepo.UpdateEvent(id, teamEvent);
        return Ok();
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTeams(int id)
    {
        await _eventRepo.DeleteEvent(id);
        return NoContent();
    }
}