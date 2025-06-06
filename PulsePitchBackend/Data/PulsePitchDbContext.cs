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

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = "1", Name = "Coach", NormalizedName = "COACH" },
                new IdentityRole { Id = "2", Name = "Member", NormalizedName = "MEMBER" }
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

            var memberUser = new IdentityUser
            {
                Id = "member-user-id",
                UserName = "playerjane",
                NormalizedUserName = "PLAYERJANE",
                Email = "jane@team.com",
                NormalizedEmail = "JANE@TEAM.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            coachUser.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(coachUser, "1234567");
            memberUser.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(memberUser, "1234567");

            modelBuilder.Entity<IdentityUser>().HasData(coachUser, memberUser);

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string> { UserId = "coach-user-id", RoleId = "1" },
                new IdentityUserRole<string> { UserId = "member-user-id", RoleId = "2" }
            );

            modelBuilder.Entity<UserProfile>().HasData(
                new UserProfile
                {
                    Id = 1,
                    FirstName = "John",
                    LastName = "Coach",
                    Address = "123 Coach Lane",
                    IdentityUserId = "coach-user-id"
                },
                new UserProfile
                {
                    Id = 2,
                    FirstName = "Jane",
                    LastName = "Player",
                    Address = "456 Field Dr",
                    IdentityUserId = "member-user-id"
                }
            );

            modelBuilder.Entity<Team>().HasData(new Team
            {
                Id = 1,
                Name = "Eagles",
                JoinCode = "JOIN123",
                CoachId = "coach-user-id"
            });

            modelBuilder.Entity<PlayerTeam>().HasData(
                new PlayerTeam { Id = 1, PlayerId = 2, TeamId = 1 }
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