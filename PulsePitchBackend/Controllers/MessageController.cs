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
public class MessageController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IMessageRepository _MessageRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<MessageController> _logger;

    public MessageController(PulsePitchDbContext context, IMessageRepository MessagesRepo, IMapper mapper, ILogger<MessageController> logger)
    {
        _context = context;
        _MessageRepo = MessagesRepo;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet("{userid}")]
    public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessagesByUserId(int userid)
    {
        try
        {
            var messages = await _MessageRepo.GetAllMessagesByUserId(userid);
            var messagesDtos = _mapper.Map<List<MessageDTO>>(messages);
            return Ok(messagesDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving messages for user {UserId}", userid);
            return StatusCode(500, new { message = "An error occurred while retrieving messages" });
        }
    }

    [HttpGet("room/{roomid}")]
    public async Task<ActionResult<IEnumerable<MessageDTO>>> GetAllMessagesByRoomId(int roomid)
    {
        try
        {
            var messages = await _MessageRepo.GetAllMessagesByRoomId(roomid);
            var messagesDtos = _mapper.Map<List<MessageDTO>>(messages);
            return Ok(messagesDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving messages for room {RoomId}", roomid);
            return StatusCode(500, new { message = "An error occurred while retrieving messages" });
        }
    }

    [HttpPost]
    public async Task<ActionResult<MessageDTO>> CreateMessage([FromBody] Message message)
    {
        try
        {
            if (message == null)
            {
                return BadRequest("Message data is required");
            }

            var messages = await _MessageRepo.CreateMessage(message);
            var messagesDtos = _mapper.Map<MessageDTO>(messages);
            return Ok(messagesDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating message");
            return StatusCode(500, new { message = "An error occurred while creating the message" });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<MessageDTO>> EditMessage(int id, [FromBody] EditMessageDTO message)
    {
        try
        {
            if (message == null)
            {
                return BadRequest("Message data is required");
            }

            var messages = await _MessageRepo.EditMessage(id, message);
            var messagesDtos = _mapper.Map<MessageDTO>(messages);
            return Ok(messagesDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error editing message {MessageId}", id);
            return StatusCode(500, new { message = "An error occurred while editing the message" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<MessageDTO>> DeleteMessageById(int id)
    {
        try
        {
            await _MessageRepo.DeleteMessageById(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting message {MessageId}", id);
            return StatusCode(500, new { message = "An error occurred while deleting the message" });
        }
    }

    [HttpDelete("room/{roomid}")]
    public async Task<ActionResult<MessageDTO>> DeleteMessageByRoomId(int roomid)
    {
        try
        {
            await _MessageRepo.DeleteMessageByRoomId(roomid);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting messages for room {RoomId}", roomid);
            return StatusCode(500, new { message = "An error occurred while deleting messages" });
        }
    }
}