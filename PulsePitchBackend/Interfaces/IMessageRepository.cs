using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.DTO;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface IMessageRepository
    {
        Task<List<Message>> GetAllMessagesByUserId(int id);
        Task<List<Message>> GetAllMessagesByRoomId(int id);
        Task<Message> CreateMessage(Message MessageData);
        Task<Message> EditMessage(int id, EditMessageDTO MessageData);
        Task<Message> DeleteMessageById(int id);
        Task<List<Message>> DeleteMessageByRoomId(int id);
    }
}