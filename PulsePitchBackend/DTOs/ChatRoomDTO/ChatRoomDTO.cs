namespace PulsePitch.DTO;

public class ChatRoomDTO
{
    public int Id { get; set; }
    public int UserOneId { get; set; }
    public UserProfileDTO? UserOne { get; set; }

    public int UserTwoId { get; set; }
    public UserProfileDTO? UserTwo { get; set; }

}
