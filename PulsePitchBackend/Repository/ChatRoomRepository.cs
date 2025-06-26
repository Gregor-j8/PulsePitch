using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.Data;
using PulsePitch.Interfaces;
using PulsePitch.Models;
using PulsePitch.DTO;
using Microsoft.EntityFrameworkCore;

namespace PulsePitch.Repository
{
    public class ChatRoomRepository : IChatRoomRepository
    {
        private readonly PulsePitchDbContext _context;
        public ChatRoomRepository(PulsePitchDbContext context)
        {
            _context = context;
        }
        public async Task<List<ChatRoom>> GetAllChatRoomByUserId(int id)
        {
    var chatRooms = await _context.ChatRoom
        .Include(cr => cr.UserOne)
        .Include(cr => cr.UserTwo)
        .Where(m => m.UserOneId == id || m.UserTwoId == id)
        .ToListAsync();

        return chatRooms.Select(cr => new ChatRoom
        {
            Id = cr.Id,
            UserOneId = cr.UserOneId,
            UserTwoId = cr.UserTwoId,
            UserOne = new UserProfile
            {
                Id = cr.UserOne.Id,
                FirstName = cr.UserOne.FirstName,
                LastName = cr.UserOne.LastName,
                UserName = cr.UserOne.UserName,
                Email = cr.UserOne.Email,
                IdentityUserId = cr.UserOne.IdentityUserId
            },
            UserTwo = new UserProfile
            {
                Id = cr.UserTwo.Id,
                FirstName = cr.UserTwo.FirstName,
                LastName = cr.UserTwo.LastName,
                UserName = cr.UserTwo.UserName,
                Email = cr.UserTwo.Email,
                IdentityUserId = cr.UserTwo.IdentityUserId
            }
        }).ToList();
        }

        public async Task<ChatRoom> CreateChatRoom(ChatRoom chatRoom)
        {
            if (chatRoom == null)
            {
                return null;
            }
            var existingChatRoom = await _context.ChatRoom.FirstOrDefaultAsync(c =>
                (c.UserOneId == chatRoom.UserOneId && c.UserTwoId == chatRoom.UserTwoId) ||
                (c.UserOneId == chatRoom.UserTwoId && c.UserTwoId == chatRoom.UserOneId));
            if (existingChatRoom == null)
            {
                await _context.ChatRoom.AddAsync(chatRoom);
                await _context.SaveChangesAsync();
                return chatRoom;
            }
            return existingChatRoom;
        }
        public async Task<ChatRoom> DeleteChatRoomById(int id)
        {
            var ChatRoom = await _context.ChatRoom.FirstOrDefaultAsync(m => m.Id == id);
            if (ChatRoom == null)
            {
                return null;
            }
            _context.ChatRoom.Remove(ChatRoom);
            await _context.SaveChangesAsync();
            return ChatRoom;
        }
    }
}