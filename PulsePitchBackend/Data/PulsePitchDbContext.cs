using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PulsePitch.Models;

namespace PulsePitch.Data
{
    public class PulsePitchDbContext : IdentityDbContext<IdentityUser>
    {
        private readonly IConfiguration _configuration;

        public DbSet<Team> Teams { get; set; }
        public DbSet<PlayerTeam> PlayerTeams { get; set; }
        public DbSet<TeamEvent> TeamEvents { get; set; }
        public DbSet<Events> Events { get; set; }
        public DbSet<TeamGame> TeamGames { get; set; }
        public DbSet<Formations> Formations { get; set; }
        public DbSet<PlayersInFormation> PlayersInFormation { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

        public PulsePitchDbContext(DbContextOptions<PulsePitchDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TeamGame>()
                .HasOne(g => g.AwayTeam)
                .WithMany()
                .HasForeignKey(g => g.AwayTeamId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TeamGame>()
                .HasOne(g => g.HomeTeam)
                .WithMany()
                .HasForeignKey(g => g.HomeTeamId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    Name = "Player",
                    NormalizedName = "PLAYER"
                },
                new IdentityRole
                {
                    Id = "e9b4c5a4-76c6-44b7-88fb-35a0228c9572",
                    Name = "Coach",
                    NormalizedName = "COACH"
                }
            );

            modelBuilder.Entity<Formations>().HasData(new Formations[]{
                new Formations
                {
                    Id = 1,
                    TeamId = 1,
                    Name = "4-3-3 Default",
                    Description = "A standard 4-3-3 attacking formation"
                }
            });
            modelBuilder.Entity<PlayersInFormation>().HasData(
                new PlayersInFormation
                {
                    Id = 1,
                    FormationId = 1,
                    PositionId = 1,
                    X = 30,
                    Y = 40,
                    Note = "Left Winger"
                },
                new PlayersInFormation
                {
                    Id = 2,
                    FormationId = 1,
                    PositionId = 2,
                    X = 50,
                    Y = 40,
                    Note = "Striker"
                },
                new PlayersInFormation
                {
                    Id = 3,
                    FormationId = 1,
                    PositionId = 3,
                    X = 70,
                    Y = 40,
                    Note = "Right Winger"
                },
                new PlayersInFormation
                {
                    Id = 4,
                    FormationId = 1,
                    PositionId = 4,
                    X = 45,
                    Y = 60,
                    Note = "Central Midfielder"
                },
                new PlayersInFormation
                {
                    Id = 5,
                    FormationId = 1,
                    PositionId = 5,
                    X = 45,
                    Y = 20,
                    Note = "Defender"
                }
            );
            modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
            {
            new IdentityUser
            {
                Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                UserName = "Administrator",
                Email = "admina@strator.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                UserName = "JohnDoe",
                Email = "john@doe.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                UserName = "JaneSmith",
                Email = "jane@smith.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                UserName = "AliceJohnson",
                Email = "alice@johnson.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                UserName = "BobWilliams",
                Email = "bob@williams.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                UserName = "EveDavis",
                Email = "Eve@Davis.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            });
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>[]
            {
                new IdentityUserRole<string>
                {
                    RoleId = "e9b4c5a4-76c6-44b7-88fb-35a0228c9572",
                    UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "a7d21fac-3b21-454a-a747-075f072d0cf3"
                },
            });
            modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
            {
                new UserProfile
                {
                    Id = 1,
                    IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                    FirstName = "Admina",
                    LastName = "Strator",
                    ImageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1",
                    CreateDateTime = new DateTime(2022, 1, 25)
                },
                new UserProfile
                {
                    Id = 2,
                    FirstName = "John",
                    LastName = "Doe",
                    CreateDateTime = new DateTime(2023, 2, 2),
                    ImageLocation = "https://robohash.org/nisiautemet.png?size=150x150&set=set1",
                    IdentityUserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                },
                new UserProfile
                {
                    Id = 3,
                    FirstName = "Jane",
                    LastName = "Smith",
                    CreateDateTime = new DateTime(2022, 3, 15),
                    ImageLocation = "https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1",
                    IdentityUserId = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                },
                new UserProfile
                {
                    Id = 4,
                    FirstName = "Alice",
                    LastName = "Johnson",
                    CreateDateTime = new DateTime(2023, 6, 10),
                    ImageLocation = "https://robohash.org/deseruntutipsum.png?size=150x150&set=set1",
                    IdentityUserId = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                },
                new UserProfile
                {
                    Id = 5,
                    FirstName = "Bob",
                    LastName = "Williams",
                    CreateDateTime = new DateTime(2023, 5, 15),
                    ImageLocation = "https://robohash.org/quiundedignissimos.png?size=150x150&set=set1",
                    IdentityUserId = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                },
                new UserProfile
                {
                    Id = 6,
                    FirstName = "Eve",
                    LastName = "Davis",
                    CreateDateTime = new DateTime(2022, 10, 18),
                    ImageLocation = "https://robohash.org/hicnihilipsa.png?size=150x150&set=set1",
                    IdentityUserId = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                }
            });
            modelBuilder.Entity<Team>().HasData(
                new Team
                {
                    Id = 1,
                    Name = "Eagles",
                    JoinCode = "EGL123",
                    CoachId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
                },
                new Team
                {
                    Id = 2,
                    Name = "Falcons",
                    JoinCode = "FLC123",
                    CoachId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
                },
                new Team
                {
                    Id = 3,
                    Name = "Wolves",
                    JoinCode = "WLV456",
                    CoachId = "a7d21fac-3b21-454a-a747-075f072d0cf3"
                },
                new Team
                {
                    Id = 4,
                    Name = "Sharks",
                    JoinCode = "SHK789",
                    CoachId = "a7d21fac-3b21-454a-a747-075f072d0cf3"
                },
                new Team
                {
                    Id = 5,
                    Name = "Titans",
                    JoinCode = "TTN321",
                    CoachId = ""
                },
                new Team
                {
                    Id = 6,
                    Name = "Panthers",
                    JoinCode = "PNR654",
                    CoachId = ""
                }
            );

            modelBuilder.Entity<PlayerTeam>().HasData(
                new PlayerTeam { Id = 1, PlayerId = 1, TeamId = 1 },
                new PlayerTeam { Id = 2, PlayerId = 2, TeamId = 6 },
                new PlayerTeam { Id = 3, PlayerId = 2, TeamId = 2 }, 
                new PlayerTeam { Id = 4, PlayerId = 3, TeamId = 4 },
                new PlayerTeam { Id = 5, PlayerId = 4, TeamId = 3 },
                new PlayerTeam { Id = 6, PlayerId = 5, TeamId = 4 },
                new PlayerTeam { Id = 7, PlayerId = 5, TeamId = 6 },
                new PlayerTeam { Id = 8, PlayerId = 6, TeamId = 5 }
            );
            modelBuilder.Entity<Events>().HasData(
                new Events { Id = 1, Name = "Practice" },
                new Events { Id = 2, Name = "Film" },
                new Events { Id = 3, Name = "Meeting" }
            );

            modelBuilder.Entity<TeamEvent>().HasData(
                new TeamEvent
                {
                    Id = 1,
                    Title = "Practice",
                    Description = "Morning practice session",
                    Start = new DateTime(2025, 6, 6, 9, 0, 0),
                    End = new DateTime(2025, 6, 6, 11, 0, 0),
                    TeamId = 1,
                    EventId = 1
                },
                new TeamEvent
                {
                    Id = 2,
                    Title = "film",
                    Description = "Afternoon film",
                    Start = new DateTime(2025, 6, 10, 14, 0, 0),
                    End = new DateTime(2025, 6, 10, 16, 0, 0),
                    TeamId = 2,
                    EventId = 2
                },
                new TeamEvent
                {
                    Id = 3,
                    Title = "Practice",
                    Description = "Early morning drills",
                    Start = new DateTime(2025, 6, 5, 7, 0, 0),
                    End = new DateTime(2025, 6, 5, 9, 0, 0),
                    TeamId = 3,
                    EventId = 1
                },
                new TeamEvent
                {
                    Id = 4,
                    Title = "meeting",
                    Description = "team meeting",
                    Start = new DateTime(2025, 6, 8, 10, 0, 0),
                    End = new DateTime(2025, 6, 8, 12, 0, 0),
                    TeamId = 4,
                    EventId = 3
                },
                new TeamEvent
                {
                    Id = 5,
                    Title = "film",
                    Description = "Tactical strategy session",
                    Start = new DateTime(2025, 6, 9, 15, 0, 0),
                    End = new DateTime(2025, 6, 9, 17, 0, 0),
                    TeamId = 5,
                    EventId = 2
                },
                new TeamEvent
                {
                    Id = 6,
                    Title = "Practice",
                    Description = "Shooting practice",
                    Start = new DateTime(2025, 6, 4, 16, 0, 0),
                    End = new DateTime(2025, 6, 4, 18, 0, 0),
                    TeamId = 6,
                    EventId = 1
                },
                new TeamEvent
                {
                    Id = 7,
                    Title = "Practice",
                    Description = "Ball control and drills",
                    Start = new DateTime(2025, 6, 3, 13, 0, 0),
                    End = new DateTime(2025, 6, 3, 15, 0, 0),
                    TeamId = 1,
                    EventId = 1
                },
                new TeamEvent
                {
                    Id = 8,
                    Title = "meeting",
                    Description = "Defensive coordination",
                    Start = new DateTime(2025, 6, 11, 9, 0, 0),
                    End = new DateTime(2025, 6, 11, 11, 0, 0),
                    TeamId = 2,
                    EventId = 3
                },
                new TeamEvent
                {
                    Id = 9,
                    Title = "Practice",
                    Description = "Midfield passing accuracy",
                    Start = new DateTime(2025, 6, 7, 10, 0, 0),
                    End = new DateTime(2025, 6, 7, 12, 0, 0),
                    TeamId = 3,
                    EventId = 1
                },
                new TeamEvent
                {
                    Id = 10,
                    Title = "film",
                    Description = "Set-piece rehearsals",
                    Start = new DateTime(2025, 6, 6, 17, 0, 0),
                    End = new DateTime(2025, 6, 6, 19, 0, 0),
                    TeamId = 4,
                    EventId = 2
                },
                new TeamEvent
                {
                    Id = 11,
                    Title = "Practice",
                    Description = "Evening conditioning session",
                    Start = new DateTime(2025, 6, 12, 18, 0, 0),
                    End = new DateTime(2025, 6, 12, 20, 0, 0),
                    TeamId = 5,
                    EventId = 1
                }
            );

            modelBuilder.Entity<TeamGame>().HasData(
                new TeamGame
                {
                    Id = 1,
                    Start = new DateTime(2025, 6, 10, 18, 0, 0),
                    End = new DateTime(2025, 6, 10, 19, 0, 0),
                    HomeTeamId = 1,
                    AwayTeamId = 4,
                    Result = "TBD"
                },
                new TeamGame
                {
                    Id = 11,
                    Start = new DateTime(2025, 6, 10, 18, 0, 0),
                    End = new DateTime(2025, 6, 10, 19, 0, 0),
                    HomeTeamId = 1,
                    AwayTeamId = 2,
                    Result = "2-1"
                },
                new TeamGame
                {
                    Id = 2,
                    Start = new DateTime(2025, 6, 12, 17, 30, 0),
                    End = new DateTime(2025, 6, 12, 18, 30, 0),
                    HomeTeamId = 3,
                    AwayTeamId = 4,
                    Result = "0-0"
                },
                new TeamGame
                {
                    Id = 3,
                    Start = new DateTime(2025, 6, 14, 20, 0, 0),
                    End = new DateTime(2025, 6, 14, 21, 0, 0),
                    HomeTeamId = 5,
                    AwayTeamId = 6,
                    Result = "1-3"
                },
                new TeamGame
                {
                    Id = 4,
                    Start = new DateTime(2025, 6, 15, 19, 0, 0),
                    End = new DateTime(2025, 6, 15, 20, 0, 0),
                    HomeTeamId = 2,
                    AwayTeamId = 4,
                    Result = "4-2"
                },
                new TeamGame
                {
                    Id = 5,
                    Start = new DateTime(2025, 6, 17, 16, 0, 0),
                    End = new DateTime(2025, 6, 17, 17, 0, 0),
                    HomeTeamId = 6,
                    AwayTeamId = 1,
                    Result = "1-1"
                },
                new TeamGame
                {
                    Id = 6,
                    Start = new DateTime(2025, 6, 18, 18, 0, 0),
                    End = new DateTime(2025, 6, 18, 19, 0, 0),
                    HomeTeamId = 3,
                    AwayTeamId = 5,
                    Result = "0-2"
                },
                new TeamGame
                {
                    Id = 7,
                    Start = new DateTime(2025, 6, 19, 18, 30, 0),
                    End = new DateTime(2025, 6, 19, 19, 30, 0),
                    HomeTeamId = 4,
                    AwayTeamId = 1,
                    Result = "3-3"
                },
                new TeamGame
                {
                    Id = 8,
                    Start = new DateTime(2025, 6, 20, 17, 0, 0),
                    End = new DateTime(2025, 6, 20, 18, 0, 0),
                    HomeTeamId = 2,
                    AwayTeamId = 5,
                    Result = "1-0"
                },
                new TeamGame
                {
                    Id = 9,
                    Start = new DateTime(2025, 6, 21, 20, 0, 0),
                    End = new DateTime(2025, 6, 21, 21, 0, 0),
                    HomeTeamId = 6,
                    AwayTeamId = 3,
                    Result = "2-2"
                },
                new TeamGame
                {
                    Id = 10,
                    Start = new DateTime(2025, 6, 22, 19, 0, 0),
                    End = new DateTime(2025, 6, 22, 20, 0, 0),
                    HomeTeamId = 5,
                    AwayTeamId = 2,
                    Result = "3-1"
                }
            );
        }
    }
}