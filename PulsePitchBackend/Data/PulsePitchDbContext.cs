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
                    Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
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
                    RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    UserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
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
            modelBuilder.Entity<Team>().HasData(new Team
            {
                Id = 1,
                Name = "Eagles",
                JoinCode = 123,
                CoachId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
            });

            modelBuilder.Entity<PlayerTeam>().HasData(
                new PlayerTeam { Id = 1, PlayerId = 2, TeamId = 1 }
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
                }
            );

            modelBuilder.Entity<TeamGame>().HasData(
                new TeamGame
                {
                    Id = 1,
                    GameDate = new DateTime(2025, 6, 10, 18, 0, 0),
                    HomeTeamId = 1,
                    AwayTeamId = 1,
                    Result = "TBD"
                }
            );
        }
    }
}