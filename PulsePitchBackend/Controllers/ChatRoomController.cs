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
public class ChatRoomController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IChatRoomRepository _ChatRoomRepo;
    private readonly IMapper _mapper;

    public ChatRoomController(PulsePitchDbContext context, IChatRoomRepository ChatRoomsRepo, IMapper mapper)
    {
        _context = context;
        _ChatRoomRepo = ChatRoomsRepo;
        _mapper = mapper;
    }

    [HttpGet("{userid}")]
    public async Task<ActionResult<IEnumerable<ChatRoomDTO>>> GetChatRoomsByUserId(int userid)
    {
        var chatRooms = await _ChatRoomRepo.GetAllChatRoomByUserId(userid);
        var chatRoomsDtos = _mapper.Map<List<ChatRoomDTO>>(chatRooms);

        return Ok(chatRoomsDtos);
    }
    [HttpPost]
    public async Task<ActionResult<ChatRoomDTO>> CreateChatRoom([FromBody] ChatRoom chatRoom)
    {
        var chatRooms = await _ChatRoomRepo.CreateChatRoom(chatRoom);
        var chatRoomsDtos = _mapper.Map<List<ChatRoomDTO>>(chatRooms);
        return Ok(chatRoomsDtos);
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult<ChatRoomDTO>> DeleteChatRoomById(int id)
    {
        await _ChatRoomRepo.DeleteChatRoomById(id);
        return NoContent();
    }
}