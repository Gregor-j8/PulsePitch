using AutoMapper;
using PulsePitch.Models;
using PulsePitch.DTO;
using PulsePitchBackend.Models;
using PulsePitchBackend.DTOs.WalkthroughPlanners;
using System.Text.Json;
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
        CreateMap<WalkthroughPlanner, WalkthroughPlannerDTO>()
            .ForMember(dest => dest.Timeline,
                opt => opt.MapFrom(src => JsonSerializer.Deserialize<WalkthroughTimelineDTO>(src.TimelineData, (JsonSerializerOptions?)null)));
        CreateMap<WalkthroughPlannerDTO, WalkthroughPlanner>()
            .ForMember(dest => dest.TimelineData,
                opt => opt.MapFrom(src => JsonSerializer.Serialize(src.Timeline, (JsonSerializerOptions?)null)));
        CreateMap<Message, MessageDTO>().ReverseMap();
        CreateMap<MatchRequest, MatchRequestDTO>().ReverseMap();
        CreateMap<CreateMatchRequestDTO, MatchRequest>().ForMember(dest => dest.RecieverId, opt => opt.Ignore());
        CreateMap<ChatRoom, ChatRoomDTO>().ReverseMap();
    }
}
