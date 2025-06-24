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
    public class MessagesRepository : IMessageRepository
    {
        private readonly PulsePitchDbContext _context;
        public MessagesRepository(PulsePitchDbContext context)
        {
            _context = context;
        }
        public async Task<List<Message>> GetAllMessagesByUserId(int id)
        {
            return await _context.Messages.Include(m => m.Sender).Include(m => m.Receiver).Where(m => m.SenderId == id).ToListAsync();
        }
        public async Task<List<Message>> GetAllMessagesByRoomId(int id)
        {
            return await _context.Messages.Include(m => m.Sender).Include(m => m.Receiver).Where(m => m.ChatRoomId == id).ToListAsync();
        }
        public async Task<Message> CreateMessage(Message message)
        {
            if (message == null)
            {
                return null;
            }
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            return message;
        }
        public async Task<Message> EditMessage(int id, EditMessageDTO message)
        {
            var existingMessage = await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
            if (message == null || existingMessage == null)
            {
                return null;
            }
            existingMessage.Content = message.Content;
            await _context.SaveChangesAsync();
            return existingMessage;
        }
        public async Task<Message> DeleteMessageById(int id)
        {
            var Message = await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
            if (Message == null)
            {
                return null;
            }
            _context.Messages.Remove(Message);
            await _context.SaveChangesAsync();
            return Message;
        }
        public async Task<List<Message>> DeleteMessageByRoomId(int id)
        {
            var messages = await _context.Messages.Where(m => m.Id == id).ToListAsync();
            if (messages == null || messages.Count == 0)
            {
                return null;
            }
            _context.Messages.RemoveRange(messages);
            await _context.SaveChangesAsync();
            return messages;
        }
    }
}