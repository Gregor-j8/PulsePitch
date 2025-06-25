using System.ComponentModel.DataAnnotations.Schema;
namespace PulsePitch.Models;

public class ChatRoom
{
    public int Id { get; set; }
    public int UserOneId { get; set; }
    public UserProfile? UserOne { get; set; }
    public int UserTwoId { get; set; }
    public UserProfile? UserTwo { get; set; }
}