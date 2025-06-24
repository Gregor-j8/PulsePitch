namespace PulsePitch.DTO;

public class MessageDTO {
    public int Id { get; set; }
    public int ChatRoomId { get; set; }
    public int SenderId { get; set; }
    public UserProfileDTO? Sender { get; set; }
    public int ReceiverId { get; set; }
    public UserProfileDTO? Receiver { get; set; }
    public string Content { get; set; }
    public DateTime SentAt { get; set; }
    public ChatRoomDTO? ChatRoom { get; set; }

    public bool IsMatchRequest { get; set; }
    public MatchRequestDTO? MatchRequestData { get; set; }
}
