using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PulsePitch.DTO;
using PulsePitch.Models;

namespace PulsePitch.Interfaces
{
    public interface IChatRoomRepository
    {
        Task<List<ChatRoom>> GetAllChatRoomByUserId(int id);
        Task<ChatRoom> CreateChatRoom(ChatRoom ChatRoomData);
        Task<ChatRoom> DeleteChatRoomById(int id);
    }
}