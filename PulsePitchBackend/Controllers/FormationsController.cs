using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulsePitch.Data;
using PulsePitch.Models;
using PulsePitch.DTO;
using PulsePitch.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace PulsePitch.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class FormationsController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IFormationRepository _FormationRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<FormationsController> _logger;
    private readonly ITeamAuthorizationService _authService;

    public FormationsController(PulsePitchDbContext context, IFormationRepository FormationRepo, IMapper mapper, ILogger<FormationsController> logger, ITeamAuthorizationService authService)
    {
        _context = context;
        _FormationRepo = FormationRepo;
        _mapper = mapper;
        _logger = logger;
        _authService = authService;
    }

    [HttpGet("team")]
    [ResponseCache(Duration = 300)]
    public async Task<ActionResult<IEnumerable<FormationsDTO>>> GetAllFormations([FromQuery] List<int> id)
    {
        try
        {
            var formations = await _FormationRepo.GetAllFormations(id);
            var formationsDtos = _mapper.Map<List<FormationsDTO>>(formations);
            return Ok(formationsDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving formations for teams");
            return StatusCode(500, new { message = "An error occurred while retrieving formations" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FormationsDTO>> GetFormationById(int id)
    {
        try
        {
            var Formation = await _FormationRepo.GetFormationsById(id);
            if (Formation == null)
                return NotFound($"Formation {id} not found");

            var FormationsDTO = _mapper.Map<FormationsDTO>(Formation);
            return Ok(FormationsDTO);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving formation {FormationId}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving the formation" });
        }
    }

    [HttpPost]
    public async Task<ActionResult> CreateFormations([FromBody] FormationsDTO formationDTO)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageFormations(formationDTO.TeamId, userId))
                return Forbid();

            Formations formation = _mapper.Map<Formations>(formationDTO);
            Formations newformation = await _FormationRepo.CreateFormation(formation);
            return Ok(newformation);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating formation");
            return StatusCode(500, new { message = "An error occurred while creating the formation" });
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> EditFormation([FromBody] EditFormationDTO formationDTO, int id)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var formation = await _FormationRepo.GetFormationsById(id);
            if (formation == null)
                return NotFound("Formation not found");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageFormations(formation.TeamId, userId))
                return Forbid();

            await _FormationRepo.EditFormation(id, formationDTO);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error editing formation {FormationId}", id);
            return StatusCode(500, new { message = "An error occurred while editing the formation" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<FormationsDTO>> DeleteFormations(int id)
    {
        try
        {
            var formation = await _FormationRepo.GetFormationsById(id);
            if (formation == null)
                return NotFound("Formation not found");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            if (!await _authService.CanManageFormations(formation.TeamId, userId))
                return Forbid();

            await _FormationRepo.DeleteFormation(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting formation {FormationId}", id);
            return StatusCode(500, new { message = "An error occurred while deleting the formation" });
        }
    }
}