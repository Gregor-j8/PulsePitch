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
        public DbSet<ChatRoom> ChatRoom { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MatchRequest> MatchRequest { get; set; }

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

            modelBuilder.Entity<ChatRoom>().HasData(
                new ChatRoom { Id = 1, UserOneId = 1, UserTwoId = 2 },
                new ChatRoom { Id = 2, UserOneId = 3, UserTwoId = 4 },
                new ChatRoom { Id = 3, UserOneId = 5, UserTwoId = 6 }
            );
            
            modelBuilder.Entity<Message>().HasData(
                new Message { Id = 1, ChatRoomId = 1, SenderId = 1, ReceiverId = 2, Content = "Hey there!", SentAt = DateTime.UtcNow,  },
                new Message { Id = 2, ChatRoomId = 1, SenderId = 2, ReceiverId = 1, Content = "Hey! Ready for practice?", SentAt = DateTime.UtcNow.AddMinutes(1) },

                new Message { Id = 3, ChatRoomId = 2, SenderId = 3, ReceiverId = 4, Content = "Coach, what time is the game?", SentAt = DateTime.UtcNow },
                new Message { Id = 4, ChatRoomId = 2, SenderId = 4, ReceiverId = 3, Content = "6 PM sharp. Be there early.", SentAt = DateTime.UtcNow.AddMinutes(2) },
                new Message { Id = 5, ChatRoomId = 3, SenderId = 5, ReceiverId = 6, Content = "New message!", SentAt = DateTime.UtcNow }
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
                new PlayersInFormation { Id = 1, FormationId = 1, PositionId = 1, X = 920, Y = 344, Note = "Player 1" },
                new PlayersInFormation { Id = 2, FormationId = 1, PositionId = 2, X = 800, Y = 122, Note = "Player 2" },
                new PlayersInFormation { Id = 3, FormationId = 1, PositionId = 3, X = 800, Y = 200, Note = "Player 3" },
                new PlayersInFormation { Id = 4, FormationId = 1, PositionId = 4, X = 800, Y = 433, Note = "Player 4" },
                new PlayersInFormation { Id = 5, FormationId = 1, PositionId = 5, X = 800, Y = 511, Note = "Player 5" },
                new PlayersInFormation { Id = 6, FormationId = 1, PositionId = 6, X = 400, Y = 316, Note = "Player 6" },
                new PlayersInFormation { Id = 7, FormationId = 1, PositionId = 7, X = 600, Y = 161, Note = "Player 7" },
                new PlayersInFormation { Id = 8, FormationId = 1, PositionId = 8, X = 600, Y = 472, Note = "Player 8" },
                new PlayersInFormation { Id = 9, FormationId = 1, PositionId = 9, X = 400, Y = 83, Note = "Player 9" },
                new PlayersInFormation { Id = 10, FormationId = 1, PositionId = 10, X = 350, Y = 316, Note = "Player 10" },
                new PlayersInFormation { Id = 11, FormationId = 1, PositionId = 11, X = 400, Y = 650, Note = "Player 11" },
                new PlayersInFormation { Id = 12, FormationId = 1, PositionId = 12, X = 65, Y = 350, Note = "Player 1" },
                new PlayersInFormation { Id = 13, FormationId = 1, PositionId = 13, X = 200, Y = 511, Note = "Player 2" },
                new PlayersInFormation { Id = 14, FormationId = 1, PositionId = 14, X = 200, Y = 433, Note = "Player 3" },
                new PlayersInFormation { Id = 15, FormationId = 1, PositionId = 15, X = 200, Y = 300, Note = "Player 4" },
                new PlayersInFormation { Id = 16, FormationId = 1, PositionId = 16, X = 200, Y = 122, Note = "Player 5" },
                new PlayersInFormation { Id = 17, FormationId = 1, PositionId = 17, X = 300, Y = 316, Note = "Player 6" },
                new PlayersInFormation { Id = 18, FormationId = 1, PositionId = 18, X = 400, Y = 472, Note = "Player 7" },
                new PlayersInFormation { Id = 19, FormationId = 1, PositionId = 19, X = 400, Y = 161, Note = "Player 8" },
                new PlayersInFormation { Id = 20, FormationId = 1, PositionId = 20, X = 600, Y = 550, Note = "Player 9" },
                new PlayersInFormation { Id = 21, FormationId = 1, PositionId = 21, X = 650, Y = 316, Note = "Player 10" },
                new PlayersInFormation { Id = 22, FormationId = 1, PositionId = 22, X = 600, Y = 183, Note = "Player 11" }
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
            new IdentityUser
            {
                Id = "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                UserName = "DavidBrown",
                Email = "david@brown.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                UserName = "OliviaTaylor",
                Email = "olivia@taylor.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                UserName = "JamesWilson",
                Email = "james@wilson.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                UserName = "SophiaMoore",
                Email = "sophia@moore.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                UserName = "WilliamAnderson",
                Email = "william@anderson.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                UserName = "MiaThomas",
                Email = "mia@thomas.comx",
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
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "c806cfae-bda9-47c5-8473-dd52fd056a9b"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f",
                    UserId = "d224a03d-bf0c-4a05-b728-e3521e45d74d"
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
                },
                new UserProfile
                {
                    Id = 7,
                    FirstName = "David",
                    LastName = "Brown",
                    CreateDateTime = new DateTime(2024, 7, 4),
                    ImageLocation = "https://robohash.org/etvoluptatemquas.png?size=150x150&set=set1",
                    IdentityUserId = "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b",
                },
                new UserProfile
                {
                    Id = 8,
                    FirstName = "Olivia",
                    LastName = "Taylor",
                    CreateDateTime = new DateTime(2023, 8, 16),
                    ImageLocation = "https://robohash.org/eiusdoloreea.png?size=150x150&set=set1",
                    IdentityUserId = "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d",
                },
                new UserProfile
                {
                    Id = 9,
                    FirstName = "James",
                    LastName = "Wilson",
                    CreateDateTime = new DateTime(2022, 9, 28),
                    ImageLocation = "https://robohash.org/voluptatemautemdolor.png?size=150x150&set=set1",
                    IdentityUserId = "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f",
                },
                new UserProfile
                {
                    Id = 10,
                    FirstName = "Sophia",
                    LastName = "Moore",
                    CreateDateTime = new DateTime(2024, 10, 10),
                    ImageLocation = "https://robohash.org/quoslaboriosamodio.png?size=150x150&set=set1",
                    IdentityUserId = "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a",
                },
                new UserProfile
                {
                    Id = 11,
                    FirstName = "William",
                    LastName = "Anderson",
                    CreateDateTime = new DateTime(2023, 11, 22),
                    ImageLocation = "https://robohash.org/temporibusdoloreea.png?size=150x150&set=set1",
                    IdentityUserId = "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b",
                },
                new UserProfile
                {
                    Id = 12,
                    FirstName = "Mia",
                    LastName = "Thomas",
                    ImageLocation = "https://robohash.org/rerumveritatisunde.png?size=150x150&set=set1",
                    IdentityUserId = "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c",
                    CreateDateTime = new DateTime(2022, 12, 3)
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
                    CoachId = "a7d21fac-3b21-454a-a747-075f072d0cf3"
                },
                new Team
                {
                    Id = 6,
                    Name = "Panthers",
                    JoinCode = "PNR654",
                    CoachId = "a7d21fac-3b21-454a-a747-075f072d0cf3"
                },
                new Team
                {
                    Id = 7,
                    Name = "Warriors",
                    JoinCode = "WAR789",
                    CoachId = "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b"
                },
                new Team
                {
                    Id = 8,
                    Name = "Royals",
                    JoinCode = "ROY321",
                    CoachId = "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d"
                },
                new Team
                {
                    Id = 9,
                    Name = "Stars",
                    JoinCode = "STR654",
                    CoachId = "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f"
                },
                new Team
                {
                    Id = 10,
                    Name = "Rangers",
                    JoinCode = "RNG987",
                    CoachId = "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a"
                }
            );

            modelBuilder.Entity<PlayerTeam>().HasData(
                new PlayerTeam { Id = 1, PlayerId = 1, TeamId = 1 },
                new PlayerTeam { Id = 2, PlayerId = 2, TeamId = 6 },
                new PlayerTeam { Id = 4, PlayerId = 3, TeamId = 4 },
                new PlayerTeam { Id = 5, PlayerId = 4, TeamId = 3 },
                new PlayerTeam { Id = 6, PlayerId = 5, TeamId = 4 },
                new PlayerTeam { Id = 7, PlayerId = 5, TeamId = 6 },
                new PlayerTeam { Id = 8, PlayerId = 6, TeamId = 5 },
                new PlayerTeam { Id = 9, PlayerId = 7, TeamId = 7 },
                new PlayerTeam { Id = 10, PlayerId = 8, TeamId = 8 },
                new PlayerTeam { Id = 11, PlayerId = 9, TeamId = 9 },
                new PlayerTeam { Id = 12, PlayerId = 10, TeamId = 10 },
                new PlayerTeam { Id = 14, PlayerId = 2, TeamId = 2 },
                new PlayerTeam { Id = 16, PlayerId = 3, TeamId = 5 },
                new PlayerTeam { Id = 17, PlayerId = 3, TeamId = 6 }
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
                },
                new TeamEvent
                {
                    Id = 12,
                    Title = "practice",
                    Description = "practice Championship Game",
                    Start = new DateTime(2025, 6, 13, 20, 0, 0),
                    End = new DateTime(2025, 6, 13, 22, 0, 0),
                    TeamId = 6,
                    EventId = 1
                },
                new TeamEvent
                {
                    Id = 13,
                    Title = "Tournament",
                    Description = "State Tournament prep",
                    Start = new DateTime(2025, 6, 14, 8, 0, 0),
                    End = new DateTime(2025, 6, 15, 22, 0, 0),
                    TeamId = 7,
                    EventId = 2
                },
                new TeamEvent
                {
                    Id = 14,
                    Title = "Practice",
                    Description = "Morning practice session",
                    Start = new DateTime(2025, 7, 1, 9, 0, 0),
                    End = new DateTime(2025, 7, 1, 11, 0, 0),
                    TeamId = 8,
                    EventId = 1
                }
            );
            modelBuilder.Entity<TeamGame>().HasData(
                new TeamGame
                {
                    Id = 19,
                    Start = new DateTime(2025, 6, 10, 18, 0, 0),
                    End = new DateTime(2025, 6, 10, 19, 0, 0),
                    HomeTeamId = 1,
                    AwayTeamId = 4,
                    Result = "TBD",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 18,
                    Start = new DateTime(2025, 6, 10, 18, 0, 0),
                    End = new DateTime(2025, 6, 10, 19, 0, 0),
                    HomeTeamId = 1,
                    AwayTeamId = 2,
                    Result = "2-1",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 17,
                    Start = new DateTime(2025, 6, 23, 19, 0, 0),
                    End = new DateTime(2025, 6, 23, 20, 0, 0),
                    HomeTeamId = 2,
                    AwayTeamId = 5,
                    Result = "3-2",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 16,
                    Start = new DateTime(2025, 6, 24, 20, 30, 0),
                    End = new DateTime(2025, 6, 24, 21, 30, 0),
                    HomeTeamId = 6,
                    AwayTeamId = 3,
                    Result = "1-0",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 1,
                    Start = new DateTime(2025, 6, 25, 17, 0, 0),
                    End = new DateTime(2025, 6, 25, 18, 0, 0),
                    HomeTeamId = 4,
                    AwayTeamId = 1,
                    Result = "2-2",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 2,
                    Start = new DateTime(2025, 6, 12, 17, 30, 0),
                    End = new DateTime(2025, 6, 12, 18, 30, 0),
                    HomeTeamId = 3,
                    AwayTeamId = 4,
                    Result = "0-0",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 3,
                    Start = new DateTime(2025, 6, 14, 20, 0, 0),
                    End = new DateTime(2025, 6, 14, 21, 0, 0),
                    HomeTeamId = 5,
                    AwayTeamId = 6,
                    Result = "1-3",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 4,
                    Start = new DateTime(2025, 6, 15, 19, 0, 0),
                    End = new DateTime(2025, 6, 15, 20, 0, 0),
                    HomeTeamId = 2,
                    AwayTeamId = 8,
                    Result = "4-2",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 5,
                    Start = new DateTime(2025, 6, 17, 16, 0, 0),
                    End = new DateTime(2025, 6, 17, 17, 0, 0),
                    HomeTeamId = 6,
                    AwayTeamId = 1,
                    Result = "1-1",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 6,
                    Start = new DateTime(2025, 6, 18, 18, 0, 0),
                    End = new DateTime(2025, 6, 18, 19, 0, 0),
                    HomeTeamId = 3,
                    AwayTeamId = 5,
                    Result = "0-2",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 7,
                    Start = new DateTime(2025, 6, 22, 18, 30, 0),
                    End = new DateTime(2025, 6, 22, 19, 30, 0),
                    HomeTeamId = 7,
                    AwayTeamId = 1,
                    Result = "3-3",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 8,
                    Start = new DateTime(2025, 6, 29, 17, 0, 0),
                    End = new DateTime(2025, 6, 29, 18, 0, 0),
                    HomeTeamId = 2,
                    AwayTeamId = 5,
                    Result = "1-0",
                     OnCalendar = true
                },
                new TeamGame
                {
                    Id = 9,
                    Start = new DateTime(2025, 6, 28, 20, 0, 0),
                    End = new DateTime(2025, 6, 28, 21, 0, 0),
                    HomeTeamId = 6,
                    AwayTeamId = 3,
                    Result = "2-2",
                    OnCalendar = true

                },
                new TeamGame
                {
                    Id = 10,
                    Start = new DateTime(2025, 6, 25, 19, 0, 0),
                    End = new DateTime(2025, 6, 25, 20, 0, 0),
                    HomeTeamId = 5,
                    AwayTeamId = 2,
                    Result = "3-1",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 12,
                    Start = new DateTime(2025, 7, 2, 19, 0, 0),
                    End = new DateTime(2025, 7, 2, 20, 0, 0),
                    HomeTeamId = 1,
                    AwayTeamId = 7,
                    Result = "TBD",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 13,
                    Start = new DateTime(2025, 7, 5, 18, 0, 0),
                    End = new DateTime(2025, 7, 5, 19, 0, 0),
                    HomeTeamId = 6,
                    AwayTeamId = 3,
                    Result = "TBD",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 14,
                    Start = new DateTime(2025, 7, 8, 18, 0, 0),
                    End = new DateTime(2025, 7, 8, 19, 0, 0),
                    HomeTeamId = 2,
                    AwayTeamId = 4,
                    Result = "TBD",
                    OnCalendar = true
                },
                new TeamGame
                {
                    Id = 15,
                    Start = new DateTime(2025, 7, 9, 18, 0, 0),
                    End = new DateTime(2025, 7, 9, 19, 0, 0),
                    HomeTeamId = 5,
                    AwayTeamId = 9,
                    Result = "TBD",
                    OnCalendar = true
                }
            );

            modelBuilder.Entity<TeamEvent>().HasData(
                new TeamEvent
                {
                    Id = 17,
                    Title = "Practice",
                    Description = "Morning practice session",
                    Start = new DateTime(2025, 7, 3, 9, 0, 0),
                    End = new DateTime(2025, 7, 3, 11, 0, 0),
                    TeamId = 1,
                    EventId = 1
                },
                new TeamEvent
                {
                    Id = 18,
                    Title = "film",
                    Description = "Afternoon film",
                    Start = new DateTime(2025, 7, 4, 14, 0, 0),
                    End = new DateTime(2025, 7, 4, 16, 0, 0),
                    TeamId = 2,
                    EventId = 2
                },
                new TeamEvent
                {
                    Id = 19,
                    Title = "Practice",
                    Description = "Early morning drills",
                    Start = new DateTime(2025, 7, 6, 7, 0, 0),
                    End = new DateTime(2025, 7, 6, 9, 0, 0),
                    TeamId = 3,
                    EventId = 1
                },
                new TeamEvent
                {
                    Id = 20,
                    Title = "meeting",
                    Description = "team meeting",
                    Start = new DateTime(2025, 7, 7, 10, 0, 0),
                    End = new DateTime(2025, 7, 7, 12, 0, 0),
                    TeamId = 4,
                    EventId = 3
                }
            );
        }
    }
}