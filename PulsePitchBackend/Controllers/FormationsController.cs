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
public class FormationsController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IFormationRepository _FormationRepo;
    private readonly IMapper _mapper;

    public FormationsController(PulsePitchDbContext context, IFormationRepository FormationRepo, IMapper mapper)
    {
        _context = context;
        _FormationRepo = FormationRepo;
        _mapper = mapper;
    }

    [HttpGet("team")]
    public async Task<ActionResult<IEnumerable<FormationsDTO>>> GetAllFormations([FromQuery] List<int> id)
    {
        var formations = await _FormationRepo.GetAllFormations(id);
        var formationsDtos = _mapper.Map<List<FormationsDTO>>(formations);
        return Ok(formationsDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FormationsDTO>> GetFormationById(int id)
    {
        var Formation = await _FormationRepo.GetFormationsById(id);
        if (Formation == null)
            return NotFound();

        var FormationsDTO = _mapper.Map<FormationsDTO>(Formation);

        return Ok(FormationsDTO);
    }

    [HttpPost]
    public async Task<ActionResult> CreateFormations([FromBody] FormationsDTO formationDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        Formations formation = _mapper.Map<Formations>(formationDTO);

        Formations newformation = await _FormationRepo.CreateFormation(formation);
        return Ok(newformation);
    }
    
    [HttpPatch("{id}")]
    public async Task<ActionResult> EditFormation([FromBody] EditFormationDTO formationDTO, int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _FormationRepo.EditFormation(id, formationDTO);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<FormationsDTO>> DeleteFormations(int id)
    {
        await _FormationRepo.DeleteFormation(id);
        return NoContent();
    }
}