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
public class ChatRoomController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IChatRoomRepository _ChatRoomRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<ChatRoomController> _logger;

    public ChatRoomController(PulsePitchDbContext context, IChatRoomRepository ChatRoomsRepo, IMapper mapper, ILogger<ChatRoomController> logger)
    {
        _context = context;
        _ChatRoomRepo = ChatRoomsRepo;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet("{userid}")]
    public async Task<ActionResult<IEnumerable<ChatRoomDTO>>> GetChatRoomsByUserId(int userid)
    {
        try
        {
            var chatRooms = await _ChatRoomRepo.GetAllChatRoomByUserId(userid);
            if (chatRooms == null || !chatRooms.Any())
            {
                return NotFound($"No chat rooms found for user {userid}");
            }

            var chatRoomsDtos = _mapper.Map<List<ChatRoomDTO>>(chatRooms);
            return Ok(chatRoomsDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving chat rooms for user {UserId}", userid);
            return StatusCode(500, new { message = "An error occurred while retrieving chat rooms" });
        }
    }
    [HttpPost]
    public async Task<ActionResult<ChatRoomDTO>> CreateChatRoom([FromBody] ChatRoom chatRoom)
    {
        try
        {
            if (chatRoom == null)
            {
                return BadRequest("Chat room data is required");
            }

            var chatRooms = await _ChatRoomRepo.CreateChatRoom(chatRoom);
            var chatRoomsDtos = _mapper.Map<ChatRoomDTO>(chatRooms);
            return Ok(chatRoomsDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating chat room");
            return StatusCode(500, new { message = "An error occurred while creating the chat room" });
        }
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult<ChatRoomDTO>> DeleteChatRoomById(int id)
    {
        try
        {
            await _ChatRoomRepo.DeleteChatRoomById(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting chat room {ChatRoomId}", id);
            return StatusCode(500, new { message = "An error occurred while deleting the chat room" });
        }
    }
}