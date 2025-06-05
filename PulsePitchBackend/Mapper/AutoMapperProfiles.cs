using AutoMapper;
using PulsePitch.Models;
using PulsePitch.DTO;
namespace PulsePitch.Mapper;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<Team, TeamDTO>().ReverseMap();
        CreateMap<TeamEvent, TeamEventDTO>().ReverseMap();
        CreateMap<TeamGame, TeamGameDTO>().ReverseMap();
    }
}
