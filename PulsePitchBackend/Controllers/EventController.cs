// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using PulsePitch.Data;
// using PulsePitch.Models;
// using PulsePitch.DTO;
// using PulsePitch.Interfaces;
// using AutoMapper;

// namespace PulsePitch.Controllers;

// [Route("api/[controller]")]
// [ApiController]
// public class EventController : ControllerBase
// {
//     private readonly PulsePitchDbContext _context;
//     private readonly IEventRepository _eventRepo;
//     private readonly IMapper _mapper;

//     public EventController(PulsePitchDbContext context, IEventRepository eventRepo, IMapper mapper)
//     {
//         _context = context;
//         _eventRepo = eventRepo;
//         _mapper = mapper;
//     }

//     [HttpGet]
//     public async Task<ActionResult<IEnumerable<TeamDTO>>> GetAllTeams()
//     {
//         var teams = await _eventRepo.GetAllEvent();
//         var teamDtos = _mapper.Map<List<TeamDTO>>(teams);

//         return Ok(teamDtos);
//     }

//     [HttpGet("{id}")]
//     public async Task<ActionResult<TeamDTO>> GetTeamsById(int id)
//     {
//         var team = await _eventRepo.GetByIdEvent(id);
//         if (team == null)
//             return NotFound();

//         var teamDto = _mapper.Map<TeamDTO>(team);

//         return Ok(teamDto);
//     }

//     [HttpPost]
//     public async Task<ActionResult> CreateTeams([FromBody] TeamDTO teamDTO)
//     {
//         if (!ModelState.IsValid)
//             return BadRequest(ModelState);

//         Team team = _mapper.Map<Team>(teamDTO);

//         await _eventRepo.CreateEvent(team);
//         return Ok();
//     }
//     [HttpPatch("{id}")]
//     public async Task<ActionResult> EditEvents([FromBody] EditTeamDTO teamDTO, int id)
//     {
//         if (!ModelState.IsValid)
//         return BadRequest(ModelState);

//         Team team = _mapper.Map<Team>(teamDTO);

//         await _eventRepo.UpdateEvent(id, team);
//         return Ok();
//     }
//     [HttpDelete("{id}")]
//     public async Task<ActionResult> DeleteTeams(int id)
//     {
//         await _eventRepo.DeleteEvent(id);
//         return NoContent();
//     }
// }