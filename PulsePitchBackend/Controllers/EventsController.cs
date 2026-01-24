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
public class EventsController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IEventRepository _EventRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<EventsController> _logger;

    public EventsController(PulsePitchDbContext context, IEventRepository EventsRepo, IMapper mapper, ILogger<EventsController> logger)
    {
        _context = context;
        _EventRepo = EventsRepo;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<IEnumerable<PlayerTeamDTO>>> GetAllEvents()
    {
        try
        {
            var events = await _EventRepo.GetAllEvents();
            var eventsDtos = _mapper.Map<List<EventsDTO>>(events);
            return Ok(eventsDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all events");
            return StatusCode(500, new { message = "An error occurred while retrieving events" });
        }
    }
}