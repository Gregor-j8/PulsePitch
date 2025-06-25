using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PulsePitchBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    JoinCode = table.Column<string>(type: "text", nullable: false),
                    CoachId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    CreateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ImageLocation = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    Roles = table.Column<List<string>>(type: "text[]", nullable: true),
                    IdentityUserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Formations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    TeamId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Formations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Formations_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MatchRequest",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProposedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: true),
                    HomeTeamId = table.Column<int>(type: "integer", nullable: false),
                    SenderId = table.Column<int>(type: "integer", nullable: false),
                    AwayTeamId = table.Column<int>(type: "integer", nullable: false),
                    RecieverId = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchRequest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchRequest_Teams_AwayTeamId",
                        column: x => x.AwayTeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MatchRequest_Teams_HomeTeamId",
                        column: x => x.HomeTeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeamEvents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Start = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    End = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    TeamId = table.Column<int>(type: "integer", nullable: false),
                    EventId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TeamEvents_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeamEvents_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeamGames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OnCalendar = table.Column<bool>(type: "boolean", nullable: false),
                    Start = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    End = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    AwayTeamId = table.Column<int>(type: "integer", nullable: false),
                    HomeTeamId = table.Column<int>(type: "integer", nullable: false),
                    Result = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamGames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TeamGames_Teams_AwayTeamId",
                        column: x => x.AwayTeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeamGames_Teams_HomeTeamId",
                        column: x => x.HomeTeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChatRoom",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserOneId = table.Column<int>(type: "integer", nullable: false),
                    UserTwoId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatRoom", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChatRoom_UserProfiles_UserOneId",
                        column: x => x.UserOneId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChatRoom_UserProfiles_UserTwoId",
                        column: x => x.UserTwoId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayerTeams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlayerId = table.Column<int>(type: "integer", nullable: false),
                    TeamId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerTeams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlayerTeams_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerTeams_UserProfiles_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayersInFormation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FormationId = table.Column<int>(type: "integer", nullable: false),
                    PositionId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Role = table.Column<string>(type: "text", nullable: true),
                    Color = table.Column<string>(type: "text", nullable: true),
                    X = table.Column<double>(type: "double precision", nullable: false),
                    Y = table.Column<double>(type: "double precision", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayersInFormation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlayersInFormation_Formations_FormationId",
                        column: x => x.FormationId,
                        principalTable: "Formations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ChatRoomId = table.Column<int>(type: "integer", nullable: false),
                    SenderId = table.Column<int>(type: "integer", nullable: false),
                    ReceiverId = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: true),
                    SentAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_ChatRoom_ChatRoomId",
                        column: x => x.ChatRoomId,
                        principalTable: "ChatRoom",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_UserProfiles_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_UserProfiles_SenderId",
                        column: x => x.SenderId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", null, "Player", "PLAYER" },
                    { "e9b4c5a4-76c6-44b7-88fb-35a0228c9572", null, "Coach", "COACH" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "9ce89d88-75da-4a80-9b0d-3fe58582b8e2", 0, "be546ed2-88d8-4450-bf5e-34dc14f551d9", "bob@williams.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEDs65UjnvQAntO3q9SMwrWlsrGo5BPt4iS6caQPDpGBFA8+dJu5OvHunY6kUZdds/A==", null, false, "64df0e37-aae6-4912-b3e9-4cc58a6bde90", false, "BobWilliams" },
                    { "a7d21fac-3b21-454a-a747-075f072d0cf3", 0, "8aac446b-c0dd-4fe2-a530-651a837c705c", "jane@smith.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEIM/KfAv4qgksukcgwOtUCjX6/03Bgvznqy8M1uilBjaGiAaQl+kzlem7ZgYpiOTRw==", null, false, "0a25f0e6-97ed-452a-a5a1-0d921d6e41a2", false, "JaneSmith" },
                    { "c806cfae-bda9-47c5-8473-dd52fd056a9b", 0, "aa711aee-5a92-42ce-b071-1cb5c98b67a6", "alice@johnson.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEMjErmj2royxyUy9wSaFWVbFkVZy/18yVtwyDQGULS7ODC7CFcrP3R5x9nMIS01p/g==", null, false, "6c57ec4c-5c34-493f-80ed-73f89410b4af", false, "AliceJohnson" },
                    { "d224a03d-bf0c-4a05-b728-e3521e45d74d", 0, "d5b5fa69-e895-439f-8bcf-87b487be1987", "Eve@Davis.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEIOtROHn4HNDsQFEhSOkICLpV13zomvabIe9r/R9sFg9pTr7321/Df3qN3OmcV0g0g==", null, false, "e9ef1dbc-66d4-4895-a317-59d27c0a6d22", false, "EveDavis" },
                    { "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", 0, "56458fae-0fae-4935-b0f0-026b03440940", "john@doe.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEJv9pvf427JQUcO+XXeLGpg2e9ffTRKV89/f6pT53qVKzBnOk0pb14OWLVwcZhMCPw==", null, false, "618b84ee-ec92-4b5f-a6d0-f27835609380", false, "JohnDoe" },
                    { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "e8ad8ea9-0e93-4c64-bce4-330dfc43ecd8", "admina@strator.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEAPAwcIOFcPDF/JjdITfw2sol7sYlCv1OgKmouZ89Py1RI3CVQhvVI1ZuEwA/Fg2Cg==", null, false, "e8379421-13fb-4bd3-82a2-1dd2595370e2", false, "Administrator" }
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Practice" },
                    { 2, "Film" },
                    { 3, "Meeting" }
                });

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "CoachId", "JoinCode", "Name" },
                values: new object[,]
                {
                    { 1, "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", "EGL123", "Eagles" },
                    { 2, "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", "FLC123", "Falcons" },
                    { 3, "a7d21fac-3b21-454a-a747-075f072d0cf3", "WLV456", "Wolves" },
                    { 4, "a7d21fac-3b21-454a-a747-075f072d0cf3", "SHK789", "Sharks" },
                    { 5, "a7d21fac-3b21-454a-a747-075f072d0cf3", "TTN321", "Titans" },
                    { 6, "a7d21fac-3b21-454a-a747-075f072d0cf3", "PNR654", "Panthers" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "a7d21fac-3b21-454a-a747-075f072d0cf3" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "d8d76512-74f1-43bb-b1fd-87d3a8aa36df" },
                    { "e9b4c5a4-76c6-44b7-88fb-35a0228c9572", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" }
                });

            migrationBuilder.InsertData(
                table: "Formations",
                columns: new[] { "Id", "Description", "Name", "TeamId" },
                values: new object[] { 1, "A standard 4-3-3 attacking formation", "4-3-3 Default", 1 });

            migrationBuilder.InsertData(
                table: "TeamEvents",
                columns: new[] { "Id", "Description", "End", "EventId", "Start", "TeamId", "Title" },
                values: new object[,]
                {
                    { 1, "Morning practice session", new DateTime(2025, 6, 6, 11, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 6, 6, 9, 0, 0, 0, DateTimeKind.Unspecified), 1, "Practice" },
                    { 2, "Afternoon film", new DateTime(2025, 6, 10, 16, 0, 0, 0, DateTimeKind.Unspecified), 2, new DateTime(2025, 6, 10, 14, 0, 0, 0, DateTimeKind.Unspecified), 2, "film" },
                    { 3, "Early morning drills", new DateTime(2025, 6, 5, 9, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 6, 5, 7, 0, 0, 0, DateTimeKind.Unspecified), 3, "Practice" },
                    { 4, "team meeting", new DateTime(2025, 6, 8, 12, 0, 0, 0, DateTimeKind.Unspecified), 3, new DateTime(2025, 6, 8, 10, 0, 0, 0, DateTimeKind.Unspecified), 4, "meeting" },
                    { 5, "Tactical strategy session", new DateTime(2025, 6, 9, 17, 0, 0, 0, DateTimeKind.Unspecified), 2, new DateTime(2025, 6, 9, 15, 0, 0, 0, DateTimeKind.Unspecified), 5, "film" },
                    { 6, "Shooting practice", new DateTime(2025, 6, 4, 18, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 6, 4, 16, 0, 0, 0, DateTimeKind.Unspecified), 6, "Practice" },
                    { 7, "Ball control and drills", new DateTime(2025, 6, 3, 15, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 6, 3, 13, 0, 0, 0, DateTimeKind.Unspecified), 1, "Practice" },
                    { 8, "Defensive coordination", new DateTime(2025, 6, 11, 11, 0, 0, 0, DateTimeKind.Unspecified), 3, new DateTime(2025, 6, 11, 9, 0, 0, 0, DateTimeKind.Unspecified), 2, "meeting" },
                    { 9, "Midfield passing accuracy", new DateTime(2025, 6, 7, 12, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 6, 7, 10, 0, 0, 0, DateTimeKind.Unspecified), 3, "Practice" },
                    { 10, "Set-piece rehearsals", new DateTime(2025, 6, 6, 19, 0, 0, 0, DateTimeKind.Unspecified), 2, new DateTime(2025, 6, 6, 17, 0, 0, 0, DateTimeKind.Unspecified), 4, "film" },
                    { 11, "Evening conditioning session", new DateTime(2025, 6, 12, 20, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 6, 12, 18, 0, 0, 0, DateTimeKind.Unspecified), 5, "Practice" }
                });

            migrationBuilder.InsertData(
                table: "TeamGames",
                columns: new[] { "Id", "AwayTeamId", "End", "HomeTeamId", "OnCalendar", "Result", "Start" },
                values: new object[,]
                {
                    { 1, 4, new DateTime(2025, 6, 10, 19, 0, 0, 0, DateTimeKind.Unspecified), 1, true, "TBD", new DateTime(2025, 6, 10, 18, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, 4, new DateTime(2025, 6, 12, 18, 30, 0, 0, DateTimeKind.Unspecified), 3, true, "0-0", new DateTime(2025, 6, 12, 17, 30, 0, 0, DateTimeKind.Unspecified) },
                    { 3, 6, new DateTime(2025, 6, 14, 21, 0, 0, 0, DateTimeKind.Unspecified), 5, true, "1-3", new DateTime(2025, 6, 14, 20, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, 4, new DateTime(2025, 6, 15, 20, 0, 0, 0, DateTimeKind.Unspecified), 2, true, "4-2", new DateTime(2025, 6, 15, 19, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, 1, new DateTime(2025, 6, 17, 17, 0, 0, 0, DateTimeKind.Unspecified), 6, true, "1-1", new DateTime(2025, 6, 17, 16, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, 5, new DateTime(2025, 6, 18, 19, 0, 0, 0, DateTimeKind.Unspecified), 3, true, "0-2", new DateTime(2025, 6, 18, 18, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, 1, new DateTime(2025, 6, 22, 19, 30, 0, 0, DateTimeKind.Unspecified), 4, true, "3-3", new DateTime(2025, 6, 22, 18, 30, 0, 0, DateTimeKind.Unspecified) },
                    { 8, 5, new DateTime(2025, 6, 29, 18, 0, 0, 0, DateTimeKind.Unspecified), 2, true, "1-0", new DateTime(2025, 6, 29, 17, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 9, 3, new DateTime(2025, 6, 28, 21, 0, 0, 0, DateTimeKind.Unspecified), 6, true, "2-2", new DateTime(2025, 6, 28, 20, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 10, 2, new DateTime(2025, 6, 25, 20, 0, 0, 0, DateTimeKind.Unspecified), 5, true, "3-1", new DateTime(2025, 6, 25, 19, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 11, 2, new DateTime(2025, 6, 10, 19, 0, 0, 0, DateTimeKind.Unspecified), 1, true, "2-1", new DateTime(2025, 6, 10, 18, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "CreateDateTime", "Email", "FirstName", "IdentityUserId", "ImageLocation", "LastName", "Roles", "UserName" },
                values: new object[,]
                {
                    { 1, new DateTime(2022, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Admina", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", "https://robohash.org/numquamutut.png?size=150x150&set=set1", "Strator", null, null },
                    { 2, new DateTime(2023, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "John", "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", "https://robohash.org/nisiautemet.png?size=150x150&set=set1", "Doe", null, null },
                    { 3, new DateTime(2022, 3, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Jane", "a7d21fac-3b21-454a-a747-075f072d0cf3", "https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1", "Smith", null, null },
                    { 4, new DateTime(2023, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Alice", "c806cfae-bda9-47c5-8473-dd52fd056a9b", "https://robohash.org/deseruntutipsum.png?size=150x150&set=set1", "Johnson", null, null },
                    { 5, new DateTime(2023, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Bob", "9ce89d88-75da-4a80-9b0d-3fe58582b8e2", "https://robohash.org/quiundedignissimos.png?size=150x150&set=set1", "Williams", null, null },
                    { 6, new DateTime(2022, 10, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Eve", "d224a03d-bf0c-4a05-b728-e3521e45d74d", "https://robohash.org/hicnihilipsa.png?size=150x150&set=set1", "Davis", null, null }
                });

            migrationBuilder.InsertData(
                table: "ChatRoom",
                columns: new[] { "Id", "UserOneId", "UserTwoId" },
                values: new object[,]
                {
                    { 1, 1, 2 },
                    { 2, 3, 4 }
                });

            migrationBuilder.InsertData(
                table: "PlayerTeams",
                columns: new[] { "Id", "PlayerId", "TeamId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 2, 6 },
                    { 3, 2, 2 },
                    { 4, 3, 4 },
                    { 5, 4, 3 },
                    { 6, 5, 4 },
                    { 7, 5, 6 },
                    { 8, 6, 5 }
                });

            migrationBuilder.InsertData(
                table: "PlayersInFormation",
                columns: new[] { "Id", "Color", "FormationId", "Name", "Note", "PositionId", "Role", "X", "Y" },
                values: new object[,]
                {
                    { 1, null, 1, null, "Left Winger", 1, null, 30.0, 40.0 },
                    { 2, null, 1, null, "Striker", 2, null, 50.0, 40.0 },
                    { 3, null, 1, null, "Right Winger", 3, null, 70.0, 40.0 },
                    { 4, null, 1, null, "Central Midfielder", 4, null, 45.0, 60.0 },
                    { 5, null, 1, null, "Defender", 5, null, 45.0, 20.0 }
                });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "ChatRoomId", "Content", "ReceiverId", "SenderId", "SentAt" },
                values: new object[,]
                {
                    { 1, 1, "Hey there!", 2, 1, new DateTime(2025, 6, 25, 21, 43, 27, 399, DateTimeKind.Utc).AddTicks(5912) },
                    { 2, 1, "Hey! Ready for practice?", 1, 2, new DateTime(2025, 6, 25, 21, 44, 27, 399, DateTimeKind.Utc).AddTicks(5914) },
                    { 3, 2, "Coach, what time is the game?", 4, 3, new DateTime(2025, 6, 25, 21, 43, 27, 399, DateTimeKind.Utc).AddTicks(5919) },
                    { 4, 2, "6 PM sharp. Be there early.", 3, 4, new DateTime(2025, 6, 25, 21, 45, 27, 399, DateTimeKind.Utc).AddTicks(5920) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChatRoom_UserOneId",
                table: "ChatRoom",
                column: "UserOneId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatRoom_UserTwoId",
                table: "ChatRoom",
                column: "UserTwoId");

            migrationBuilder.CreateIndex(
                name: "IX_Formations_TeamId",
                table: "Formations",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchRequest_AwayTeamId",
                table: "MatchRequest",
                column: "AwayTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchRequest_HomeTeamId",
                table: "MatchRequest",
                column: "HomeTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChatRoomId",
                table: "Messages",
                column: "ChatRoomId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReceiverId",
                table: "Messages",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerTeams_PlayerId",
                table: "PlayerTeams",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerTeams_TeamId",
                table: "PlayerTeams",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayersInFormation_FormationId",
                table: "PlayersInFormation",
                column: "FormationId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamEvents_EventId",
                table: "TeamEvents",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamEvents_TeamId",
                table: "TeamEvents",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamGames_AwayTeamId",
                table: "TeamGames",
                column: "AwayTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamGames_HomeTeamId",
                table: "TeamGames",
                column: "HomeTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "MatchRequest");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "PlayerTeams");

            migrationBuilder.DropTable(
                name: "PlayersInFormation");

            migrationBuilder.DropTable(
                name: "TeamEvents");

            migrationBuilder.DropTable(
                name: "TeamGames");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "ChatRoom");

            migrationBuilder.DropTable(
                name: "Formations");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
