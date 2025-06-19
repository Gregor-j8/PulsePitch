using AutoMapper;
using PulsePitch.Models;
using PulsePitch.DTO;
namespace PulsePitch.Mapper;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<UserProfile, UserProfileDTO>().ReverseMap();
        CreateMap<PlayerTeam, PlayerTeamDTO>().ReverseMap();
        CreateMap<PlayerTeam, GetTeamsByPlayerIdDTO>().ReverseMap();
        CreateMap<Team, TeamDTO>().ReverseMap();
        CreateMap<Team, EditTeamDTO>().ReverseMap();
        CreateMap<TeamEvent, TeamEventDTO>().ReverseMap();
        CreateMap<Events, EventsDTO>().ReverseMap();
        CreateMap<TeamGame, TeamGameDTO>().ReverseMap();
        CreateMap<Formations, FormationsDTO>().ReverseMap();
    }
}
