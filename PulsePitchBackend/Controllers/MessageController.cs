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
public class MessageController : ControllerBase
{
    private readonly PulsePitchDbContext _context;
    private readonly IMessageRepository _MessageRepo;
    private readonly IMapper _mapper;

    public MessageController(PulsePitchDbContext context, IMessageRepository MessagesRepo, IMapper mapper)
    {
        _context = context;
        _MessageRepo = MessagesRepo;
        _mapper = mapper;
    }

    [HttpGet("{userid}")]
    public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessagesByUserId(int userid)
    {
        var messages = await _MessageRepo.GetAllMessagesByUserId(userid);
        var messagesDtos = _mapper.Map<List<MessageDTO>>(messages);

        return Ok(messagesDtos);
    }

    [HttpGet("room/{roomid}")]
    public async Task<ActionResult<IEnumerable<MessageDTO>>> GetAllMessagesByRoomId(int roomid)
    {
        var messages = await _MessageRepo.GetAllMessagesByRoomId(roomid);
        var messagesDtos = _mapper.Map<List<MessageDTO>>(messages);

        return Ok(messagesDtos);
    }
    [HttpPost]
    public async Task<ActionResult<MessageDTO>> CreateMessage([FromBody] Message message)
    {
        var messages = await _MessageRepo.CreateMessage(message);
        var messagesDtos = _mapper.Map<MessageDTO>(messages);
        return Ok(messagesDtos);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<MessageDTO>> EditMessage(int id, [FromBody] EditMessageDTO message)
    {
        var messages = await _MessageRepo.EditMessage(id, message);
        var messagesDtos = _mapper.Map<MessageDTO>(messages);
        return Ok(messagesDtos);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<MessageDTO>> DeleteMessageById(int id)
    {
        await _MessageRepo.DeleteMessageById(id);
        return NoContent();
    }
    [HttpDelete("room/{roomid}")]
    public async Task<ActionResult<MessageDTO>> DeleteMessageByRoomId(int roomid)
    {
        await _MessageRepo.DeleteMessageByRoomId(roomid);
        return NoContent();
    }
}