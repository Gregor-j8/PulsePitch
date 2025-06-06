using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PulsePitch.Models;

namespace PulsePitch.Data
{
    public class PulsePitchDbContext : IdentityDbContext<IdentityUser>
    {
        private readonly IConfiguration _configuration;

        public DbSet<Team> Teams { get; set; }
        public DbSet<PlayerTeam> PlayerTeams { get; set; }
        public DbSet<TeamEvent> TeamEvents { get; set; }
        public DbSet<TeamGame> TeamGames { get; set; }
        public DbSet<UserProfile> User { get; set; }


        public PulsePitchDbContext(DbContextOptions<PulsePitchDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "1",
                    Name = "Coach",
                    NormalizedName = "COACH"
                },
                new IdentityRole
                {
                    Id = "2",
                    Name = "Member",
                    NormalizedName = "MEMBER"
                }
            );

            var coachUser = new IdentityUser
            {
                Id = "coach-user-id",
                UserName = "coachjohn",
                NormalizedUserName = "COACHJOHN",
                Email = "john@team.com",
                NormalizedEmail = "JOHN@TEAM.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            coachUser.PasswordHash = new PasswordHasher<IdentityUser>()
                .HashPassword(coachUser, "1234567");

            modelBuilder.Entity<IdentityUser>().HasData(coachUser);

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                UserId = "coach-user-id",
                RoleId = "coach-role-id"
            });

            modelBuilder.Entity<Team>().HasData(new Team
            {
                Id = 1,
                Name = "Eagles",
                JoinCode = "JOIN123",
                CoachId = 1
            });

            modelBuilder.Entity<PlayerTeam>().HasData(
                new PlayerTeam { Id = 1, PlayerId = 2, TeamId = 1 },
                new PlayerTeam { Id = 2, PlayerId = 3, TeamId = 1 }
            );

            modelBuilder.Entity<TeamEvent>().HasData(
                new TeamEvent
                {
                    Id = 1,
                    Title = "Practice",
                    Description = "Morning practice session",
                    Start = new DateTime(2025, 6, 6, 9, 0, 0),
                    End = new DateTime(2025, 6, 6, 11, 0, 0),
                    TeamId = 1
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
