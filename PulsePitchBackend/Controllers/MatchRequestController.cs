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
    private readonly ILogger<MatchRequestController> _logger;

    public MatchRequestController(PulsePitchDbContext context, IMatchRequestRepository MatchRequestsRepo, IMapper mapper, ILogger<MatchRequestController> logger)
    {
        _context = context;
        _MatchRequestRepo = MatchRequestsRepo;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet("user/{userid}")]
    public async Task<ActionResult<IEnumerable<MatchRequestDTO>>> GetMatchRequestsByUserId(int userid)
    {
        try
        {
            var matchRequests = await _MatchRequestRepo.GetAllMatchRequestByUserId(userid);
            var matchRequestsDtos = _mapper.Map<List<MatchRequestDTO>>(matchRequests);
            return Ok(matchRequestsDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving match requests for user {UserId}", userid);
            return StatusCode(500, new { message = "An error occurred while retrieving match requests" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<MatchRequestDTO>>> GetAllMatchRequestsById(int id)
    {
        try
        {
            var matchRequests = await _MatchRequestRepo.GetAllMatchRequestById(id);
            var matchRequestsDtos = _mapper.Map<List<MatchRequestDTO>>(matchRequests);
            return Ok(matchRequestsDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving match request {MatchRequestId}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving match request" });
        }
    }

    [HttpPost]
    public async Task<ActionResult<MatchRequestDTO>> CreateMatchRequest([FromBody] CreateMatchRequestDTO matchRequest)
    {
        try
        {
            if (matchRequest == null)
            {
                return BadRequest("Match request data is required");
            }

            UserProfile receiverProfile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.IdentityUserId == matchRequest.RecieverId);
            if (receiverProfile == null)
            {
                return NotFound("Receiver profile not found");
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
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating match request");
            return StatusCode(500, new { message = "An error occurred while creating match request" });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<MatchRequestDTO>> EditMatchRequest(int id, [FromBody] MatchRequestDTO matchRequest)
    {
        try
        {
            if (matchRequest == null)
            {
                return BadRequest("Match request data is required");
            }

            var matchRequests = await _MatchRequestRepo.EditMatchRequest(id, matchRequest);
            var matchRequestsDtos = _mapper.Map<MatchRequestDTO>(matchRequests);
            return Ok(matchRequestsDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error editing match request {MatchRequestId}", id);
            return StatusCode(500, new { message = "An error occurred while editing match request" });
        }
    }

    [HttpPut("match/{matchid}")]
    public async Task<ActionResult<MatchRequestDTO>> ResponseMatchRequest(int matchid, MatchResponseDTO response)
    {
        try
        {
            if (response == null)
            {
                return BadRequest("Response data is required");
            }

            var matchRequests = await _MatchRequestRepo.ResponseMatchRequest(matchid, response);
            var matchRequestsDtos = _mapper.Map<MatchRequestDTO>(matchRequests);
            return Ok(matchRequestsDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error responding to match request {MatchRequestId}", matchid);
            return StatusCode(500, new { message = "An error occurred while responding to match request" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<MatchRequestDTO>> DeleteMatchRequestById(int id)
    {
        try
        {
            await _MatchRequestRepo.DeleteMatchRequestById(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting match request {MatchRequestId}", id);
            return StatusCode(500, new { message = "An error occurred while deleting match request" });
        }
    }
}