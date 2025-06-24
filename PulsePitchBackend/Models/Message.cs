namespace PulsePitch.Models;

public class Message
{
    public int Id { get; set; }
    public int ChatRoomId { get; set; }
    public int SenderId { get; set; }
    public UserProfile? Sender { get; set; }
    public int ReceiverId { get; set; }
    public UserProfile? Receiver { get; set; }
    public string Content { get; set; }
    public DateTime SentAt { get; set; }
    public ChatRoom? ChatRoom { get; set; }
}
