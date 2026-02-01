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
        CreateMap<PlayerTeam, PendingJoinRequestDTO>().ReverseMap();
        CreateMap<Team, TeamDTO>().ReverseMap();
        CreateMap<Team, EditTeamDTO>().ReverseMap();
        CreateMap<Team, PublicTeamSearchDTO>().ReverseMap();
        CreateMap<TeamEvent, TeamEventDTO>().ReverseMap();
        CreateMap<Events, EventsDTO>().ReverseMap();
        CreateMap<TeamGame, TeamGameDTO>().ReverseMap();
        CreateMap<Formations, FormationsDTO>().ReverseMap();
        CreateMap<PlayersInFormation, PlayersInFormationDTO>().ReverseMap();
        CreateMap<Message, MessageDTO>().ReverseMap();
        CreateMap<MatchRequest, MatchRequestDTO>().ReverseMap();
        CreateMap<CreateMatchRequestDTO, MatchRequest>().ForMember(dest => dest.RecieverId, opt => opt.Ignore());
        CreateMap<ChatRoom, ChatRoomDTO>().ReverseMap();
    }
}
