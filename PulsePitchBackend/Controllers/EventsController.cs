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

    public EventsController(PulsePitchDbContext context, IEventRepository EventsRepo, IMapper mapper)
    {
        _context = context;
        _EventRepo = EventsRepo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlayerTeamDTO>>> GetAllEvents()
    {
        var events = await _EventRepo.GetAllEvents();
        var eventsDtos = _mapper.Map<List<EventsDTO>>(events);

        return Ok(eventsDtos);
    }
}