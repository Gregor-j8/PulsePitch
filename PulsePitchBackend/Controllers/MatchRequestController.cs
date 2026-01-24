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
public class MatchRequestController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IMatchRequestRepository _MatchRequestRepo;
    private readonly IMapper _mapper;

    public MatchRequestController(PulsePitchDbContext context, IMatchRequestRepository MatchRequestsRepo, IMapper mapper)
    {
        _context = context;
        _MatchRequestRepo = MatchRequestsRepo;
        _mapper = mapper;
    }

    [HttpGet("user/{userid}")]
    public async Task<ActionResult<IEnumerable<MatchRequestDTO>>> GetMatchRequestsByUserId(int userid)
    {
        var matchRequests = await _MatchRequestRepo.GetAllMatchRequestByUserId(userid);
        var matchRequestsDtos = _mapper.Map<List<MatchRequestDTO>>(matchRequests);

        return Ok(matchRequestsDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<MatchRequestDTO>>> GetAllMatchRequestsById(int id)
    {
        var matchRequests = await _MatchRequestRepo.GetAllMatchRequestById(id);
        var matchRequestsDtos = _mapper.Map<List<MatchRequestDTO>>(matchRequests);

        return Ok(matchRequestsDtos);
    }
    [HttpPost]
    public async Task<ActionResult<MatchRequestDTO>> CreateMatchRequest([FromBody] CreateMatchRequestDTO matchRequest)
    {
        UserProfile receiverProfile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.IdentityUserId == matchRequest.RecieverId);
        if (receiverProfile == null)
        {
            return NotFound("not found.");
        }
        MatchRequest matchRequestEntity = new MatchRequest
        {
            ProposedDate = matchRequest.ProposedDate,
            Message = matchRequest.Message,
            HomeTeamId = matchRequest.HomeTeamId,
            SenderId = matchRequest.SenderId,
            AwayTeamId = matchRequest.AwayTeamId,
            RecieverId = receiverProfile.Id,
            Status = matchRequest.Status
        };
        var createdMatchRequest = await _MatchRequestRepo.CreateMatchRequest(matchRequestEntity);
        if (createdMatchRequest == null)
        {
            return BadRequest("Invalid data provided");
        }
        var matchRequestDto = _mapper.Map<MatchRequestDTO>(createdMatchRequest);
        return Ok(matchRequestDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<MatchRequestDTO>> EditMatchRequest(int id, [FromBody] MatchRequestDTO matchRequest)
    {
        var matchRequests = await _MatchRequestRepo.EditMatchRequest(id, matchRequest);
        var matchRequestsDtos = _mapper.Map<MatchRequestDTO>(matchRequests);
        return Ok(matchRequestsDtos);
    }
    [HttpPut("match/{matchid}")]
    public async Task<ActionResult<MatchRequestDTO>> ResponseMatchRequest(int matchid, MatchResponseDTO response)
    {
        var matchRequests = await _MatchRequestRepo.ResponseMatchRequest(matchid, response);
        var matchRequestsDtos = _mapper.Map<MatchRequestDTO>(matchRequests);
        return Ok(matchRequestsDtos);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<MatchRequestDTO>> DeleteMatchRequestById(int id)
    {
        await _MatchRequestRepo.DeleteMatchRequestById(id);
        return NoContent();
    }
}