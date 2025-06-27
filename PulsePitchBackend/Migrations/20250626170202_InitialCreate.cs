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
                    { "9ce89d88-75da-4a80-9b0d-3fe58582b8e2", 0, "c8b11e1e-d4b0-4bbd-9f02-bf6b4e9ecb46", "bob@williams.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAECUKA8I6gURLnCyYWaxzJZ22V63u93k5cARgl7dhPidyYXMwmexF1Qj6wi7ZBrDroA==", null, false, "e1742dfd-1622-440c-bd63-7dcd1fbc2dc5", false, "BobWilliams" },
                    { "a7d21fac-3b21-454a-a747-075f072d0cf3", 0, "6751ec2f-10ab-421b-a115-5ee29c838b0f", "jane@smith.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEBfqDLoqxPYvcdNKIABUWYIs6CvgKCJMdpCAKDJ49f46OwpV8sFyEafAX0WlnHlZ2A==", null, false, "a3bda271-6856-4d8a-99bb-9dd2f76315fe", false, "JaneSmith" },
                    { "c806cfae-bda9-47c5-8473-dd52fd056a9b", 0, "6ed7c422-72d9-48d1-8854-c1594a0d40e9", "alice@johnson.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEDRQ/eGSYvHJztb6eMVogTvWORevocHhFjIRK9jXqBKTfaN+OIl2Wv1mI/vTmxxcOQ==", null, false, "47f7fe99-52c2-4122-8d6e-c8d222457bcc", false, "AliceJohnson" },
                    { "d224a03d-bf0c-4a05-b728-e3521e45d74d", 0, "8b714d5f-70c6-46c8-9ee0-48906806bc11", "Eve@Davis.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEGLVxQMkrx87IyjdJnsxJZCHLiztvv9qhuvaM53J+jaq5nVi0A5Qt52tY4lOZDtc2g==", null, false, "638d4cdc-2c76-4315-905f-2785168766d5", false, "EveDavis" },
                    { "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", 0, "24f387d9-3112-4d81-976d-1ddc3d1a7d91", "john@doe.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEOvLIqc5Yqn2o4NEp3MjOAAIAlVoLhe53/l2TVLZ21E5WVB46O8O7EotivcIlGYUFw==", null, false, "a8f6d1fa-77af-4c2b-9af0-fef779934b92", false, "JohnDoe" },
                    { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "e11c8c07-ddcb-4438-a829-74f1c142652b", "admina@strator.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEL6yqHX+Qk2DRcWomyT21t9v9HhV/7kNZpT3D7q+TFQh0RmbNi3RO898eYIasxLXUQ==", null, false, "98042dc5-2ebf-4ed6-85f7-6b7558c1f79d", false, "Administrator" },
                    { "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b", 0, "1b5631a4-2933-486e-98ab-77e6721f85d0", "david@brown.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEEJBNMUARgaXc4SNmOFiJRbGX1cXCxPISfx5KjC8lJNwozTvRmxHIF58vpo9uhd7hA==", null, false, "c37e80eb-aea3-4ce3-9149-225439091b23", false, "DavidBrown" },
                    { "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d", 0, "3f4c6dc2-272e-4409-a10d-6d04e6062c3b", "olivia@taylor.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEPfTygfYjlG818vLnm9BgEp0/MYny8IdBqRV7P52QuPc9p/m85CmN8Xnon0wf2dgOA==", null, false, "f9263624-d831-4fd7-ba74-abf2e59beeed", false, "OliviaTaylor" },
                    { "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f", 0, "fcc79ea9-f07e-4f42-ab32-984ebf06a407", "james@wilson.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAELPQGsP1ANf1UmJkFOoE2RvYItyqslHE0wutus5JpmMa+i4+rEqaIvtTti40tTsXLg==", null, false, "d06c4721-47bd-42e0-9181-80a03ffad7bd", false, "JamesWilson" },
                    { "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a", 0, "bee9a196-420f-4878-8ebe-e55aeaf2adb2", "sophia@moore.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEMiJ4+k0iAv+h2Mqz6HzaP/Xs7vQLQjvcyIaw8ZP/JchQIE9IX9wGSm9qbwvCPCT5Q==", null, false, "96ec924e-14d9-42b4-bca3-60a2e8595d86", false, "SophiaMoore" },
                    { "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b", 0, "ceb0aac6-4d7d-437f-a486-2ccb26854f4a", "william@anderson.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEKRBj8BV9in2Xe37WN5qunsbCRaRS64T8LsBBW/ietf1RDtjzL138+B+FDHBjS2W4w==", null, false, "b2412cf8-40d8-4bb8-9d7b-1882a72c39bc", false, "WilliamAnderson" },
                    { "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c", 0, "e345dcc4-6f04-4c52-b60e-a680cfa002c2", "mia@thomas.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAELlF5KA0lzNgUr2wNPGmNd5LuWQmM1HT16aVABlE7CtbtyVYbZqdCIVZqLGwOJdLUw==", null, false, "9c80a07d-39c8-4fd4-b009-ebd043465eb3", false, "MiaThomas" }
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
                    { 6, "a7d21fac-3b21-454a-a747-075f072d0cf3", "PNR654", "Panthers" },
                    { 7, "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b", "WAR789", "Warriors" },
                    { 8, "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d", "ROY321", "Royals" },
                    { 9, "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f", "STR654", "Stars" },
                    { 10, "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a", "RNG987", "Rangers" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "9ce89d88-75da-4a80-9b0d-3fe58582b8e2" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "a7d21fac-3b21-454a-a747-075f072d0cf3" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "c806cfae-bda9-47c5-8473-dd52fd056a9b" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "d224a03d-bf0c-4a05-b728-e3521e45d74d" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "d8d76512-74f1-43bb-b1fd-87d3a8aa36df" },
                    { "e9b4c5a4-76c6-44b7-88fb-35a0228c9572", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b" },
                    { "cb1c88d2-f3be-4c6b-b31f-a5f3e39e274f", "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c" }
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
                    { 11, "Evening conditioning session", new DateTime(2025, 6, 12, 20, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 6, 12, 18, 0, 0, 0, DateTimeKind.Unspecified), 5, "Practice" },
                    { 12, "practice Championship Game", new DateTime(2025, 6, 13, 22, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 6, 13, 20, 0, 0, 0, DateTimeKind.Unspecified), 6, "practice" },
                    { 13, "State Tournament prep", new DateTime(2025, 6, 15, 22, 0, 0, 0, DateTimeKind.Unspecified), 2, new DateTime(2025, 6, 14, 8, 0, 0, 0, DateTimeKind.Unspecified), 7, "Tournament" },
                    { 14, "Morning practice session", new DateTime(2025, 7, 1, 11, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 7, 1, 9, 0, 0, 0, DateTimeKind.Unspecified), 8, "Practice" },
                    { 17, "Morning practice session", new DateTime(2025, 7, 3, 11, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 7, 3, 9, 0, 0, 0, DateTimeKind.Unspecified), 1, "Practice" },
                    { 18, "Afternoon film", new DateTime(2025, 7, 4, 16, 0, 0, 0, DateTimeKind.Unspecified), 2, new DateTime(2025, 7, 4, 14, 0, 0, 0, DateTimeKind.Unspecified), 2, "film" },
                    { 19, "Early morning drills", new DateTime(2025, 7, 6, 9, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2025, 7, 6, 7, 0, 0, 0, DateTimeKind.Unspecified), 3, "Practice" },
                    { 20, "team meeting", new DateTime(2025, 7, 7, 12, 0, 0, 0, DateTimeKind.Unspecified), 3, new DateTime(2025, 7, 7, 10, 0, 0, 0, DateTimeKind.Unspecified), 4, "meeting" }
                });

            migrationBuilder.InsertData(
                table: "TeamGames",
                columns: new[] { "Id", "AwayTeamId", "End", "HomeTeamId", "OnCalendar", "Result", "Start" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 6, 25, 18, 0, 0, 0, DateTimeKind.Unspecified), 4, true, "2-2", new DateTime(2025, 6, 25, 17, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, 4, new DateTime(2025, 6, 12, 18, 30, 0, 0, DateTimeKind.Unspecified), 3, true, "0-0", new DateTime(2025, 6, 12, 17, 30, 0, 0, DateTimeKind.Unspecified) },
                    { 3, 6, new DateTime(2025, 6, 14, 21, 0, 0, 0, DateTimeKind.Unspecified), 5, true, "1-3", new DateTime(2025, 6, 14, 20, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, 8, new DateTime(2025, 6, 15, 20, 0, 0, 0, DateTimeKind.Unspecified), 2, true, "4-2", new DateTime(2025, 6, 15, 19, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, 1, new DateTime(2025, 6, 17, 17, 0, 0, 0, DateTimeKind.Unspecified), 6, true, "1-1", new DateTime(2025, 6, 17, 16, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, 5, new DateTime(2025, 6, 18, 19, 0, 0, 0, DateTimeKind.Unspecified), 3, true, "0-2", new DateTime(2025, 6, 18, 18, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, 1, new DateTime(2025, 6, 22, 19, 30, 0, 0, DateTimeKind.Unspecified), 7, true, "3-3", new DateTime(2025, 6, 22, 18, 30, 0, 0, DateTimeKind.Unspecified) },
                    { 8, 5, new DateTime(2025, 6, 29, 18, 0, 0, 0, DateTimeKind.Unspecified), 2, true, "1-0", new DateTime(2025, 6, 29, 17, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 9, 3, new DateTime(2025, 6, 28, 21, 0, 0, 0, DateTimeKind.Unspecified), 6, true, "2-2", new DateTime(2025, 6, 28, 20, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 10, 2, new DateTime(2025, 6, 25, 20, 0, 0, 0, DateTimeKind.Unspecified), 5, true, "3-1", new DateTime(2025, 6, 25, 19, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 12, 7, new DateTime(2025, 7, 2, 20, 0, 0, 0, DateTimeKind.Unspecified), 1, true, "TBD", new DateTime(2025, 7, 2, 19, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 13, 3, new DateTime(2025, 7, 5, 19, 0, 0, 0, DateTimeKind.Unspecified), 6, true, "TBD", new DateTime(2025, 7, 5, 18, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 14, 4, new DateTime(2025, 7, 8, 19, 0, 0, 0, DateTimeKind.Unspecified), 2, true, "TBD", new DateTime(2025, 7, 8, 18, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 15, 9, new DateTime(2025, 7, 9, 19, 0, 0, 0, DateTimeKind.Unspecified), 5, true, "TBD", new DateTime(2025, 7, 9, 18, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 16, 3, new DateTime(2025, 6, 24, 21, 30, 0, 0, DateTimeKind.Unspecified), 6, true, "1-0", new DateTime(2025, 6, 24, 20, 30, 0, 0, DateTimeKind.Unspecified) },
                    { 17, 5, new DateTime(2025, 6, 23, 20, 0, 0, 0, DateTimeKind.Unspecified), 2, true, "3-2", new DateTime(2025, 6, 23, 19, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 18, 2, new DateTime(2025, 6, 10, 19, 0, 0, 0, DateTimeKind.Unspecified), 1, true, "2-1", new DateTime(2025, 6, 10, 18, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 19, 4, new DateTime(2025, 6, 10, 19, 0, 0, 0, DateTimeKind.Unspecified), 1, true, "TBD", new DateTime(2025, 6, 10, 18, 0, 0, 0, DateTimeKind.Unspecified) }
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
                    { 6, new DateTime(2022, 10, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Eve", "d224a03d-bf0c-4a05-b728-e3521e45d74d", "https://robohash.org/hicnihilipsa.png?size=150x150&set=set1", "Davis", null, null },
                    { 7, new DateTime(2024, 7, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "David", "e5c98b1e-5b93-4a7a-9b5a-7a9f9b7b9b7b", "https://robohash.org/etvoluptatemquas.png?size=150x150&set=set1", "Brown", null, null },
                    { 8, new DateTime(2023, 8, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Olivia", "f6d87a2d-6c84-4b8f-a9e3-8e7a6f5b4c3d", "https://robohash.org/eiusdoloreea.png?size=150x150&set=set1", "Taylor", null, null },
                    { 9, new DateTime(2022, 9, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "James", "g7e96c3e-7d95-4c9a-b0f4-9c8b7a5d3e2f", "https://robohash.org/voluptatemautemdolor.png?size=150x150&set=set1", "Wilson", null, null },
                    { 10, new DateTime(2024, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Sophia", "h8f05d4f-8e06-4d0b-a105-ad9c6b4e4d1a", "https://robohash.org/quoslaboriosamodio.png?size=150x150&set=set1", "Moore", null, null },
                    { 11, new DateTime(2023, 11, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "William", "i9g14e5g-9f17-4e1c-b216-be8d5a3c2b0b", "https://robohash.org/temporibusdoloreea.png?size=150x150&set=set1", "Anderson", null, null },
                    { 12, new DateTime(2022, 12, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Mia", "j0h23f6h-0a28-4f2d-b327-cf9e4b2d1c0c", "https://robohash.org/rerumveritatisunde.png?size=150x150&set=set1", "Thomas", null, null }
                });

            migrationBuilder.InsertData(
                table: "ChatRoom",
                columns: new[] { "Id", "UserOneId", "UserTwoId" },
                values: new object[,]
                {
                    { 1, 1, 2 },
                    { 2, 3, 4 },
                    { 3, 5, 6 }
                });

            migrationBuilder.InsertData(
                table: "PlayerTeams",
                columns: new[] { "Id", "PlayerId", "TeamId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 2, 6 },
                    { 4, 3, 4 },
                    { 5, 4, 3 },
                    { 6, 5, 4 },
                    { 7, 5, 6 },
                    { 8, 6, 5 },
                    { 9, 7, 7 },
                    { 10, 8, 8 },
                    { 11, 9, 9 },
                    { 12, 10, 10 },
                    { 14, 2, 2 },
                    { 16, 3, 5 },
                    { 17, 3, 6 }
                });

            migrationBuilder.InsertData(
                table: "PlayersInFormation",
                columns: new[] { "Id", "Color", "FormationId", "Name", "Note", "PositionId", "Role", "X", "Y" },
                values: new object[,]
                {
                    { 1, null, 1, null, "Player 1", 1, null, 920.0, 344.0 },
                    { 2, null, 1, null, "Player 2", 2, null, 800.0, 122.0 },
                    { 3, null, 1, null, "Player 3", 3, null, 800.0, 200.0 },
                    { 4, null, 1, null, "Player 4", 4, null, 800.0, 433.0 },
                    { 5, null, 1, null, "Player 5", 5, null, 800.0, 511.0 },
                    { 6, null, 1, null, "Player 6", 6, null, 400.0, 316.0 },
                    { 7, null, 1, null, "Player 7", 7, null, 600.0, 161.0 },
                    { 8, null, 1, null, "Player 8", 8, null, 600.0, 472.0 },
                    { 9, null, 1, null, "Player 9", 9, null, 400.0, 83.0 },
                    { 10, null, 1, null, "Player 10", 10, null, 350.0, 316.0 },
                    { 11, null, 1, null, "Player 11", 11, null, 400.0, 650.0 },
                    { 12, null, 1, null, "Player 1", 12, null, 65.0, 350.0 },
                    { 13, null, 1, null, "Player 2", 13, null, 200.0, 511.0 },
                    { 14, null, 1, null, "Player 3", 14, null, 200.0, 433.0 },
                    { 15, null, 1, null, "Player 4", 15, null, 200.0, 300.0 },
                    { 16, null, 1, null, "Player 5", 16, null, 200.0, 122.0 },
                    { 17, null, 1, null, "Player 6", 17, null, 300.0, 316.0 },
                    { 18, null, 1, null, "Player 7", 18, null, 400.0, 472.0 },
                    { 19, null, 1, null, "Player 8", 19, null, 400.0, 161.0 },
                    { 20, null, 1, null, "Player 9", 20, null, 600.0, 550.0 },
                    { 21, null, 1, null, "Player 10", 21, null, 650.0, 316.0 },
                    { 22, null, 1, null, "Player 11", 22, null, 600.0, 183.0 }
                });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "ChatRoomId", "Content", "ReceiverId", "SenderId", "SentAt" },
                values: new object[,]
                {
                    { 1, 1, "Hey there!", 2, 1, new DateTime(2025, 6, 26, 17, 2, 1, 679, DateTimeKind.Utc).AddTicks(7231) },
                    { 2, 1, "Hey! Ready for practice?", 1, 2, new DateTime(2025, 6, 26, 17, 3, 1, 679, DateTimeKind.Utc).AddTicks(7232) },
                    { 3, 2, "Coach, what time is the game?", 4, 3, new DateTime(2025, 6, 26, 17, 2, 1, 679, DateTimeKind.Utc).AddTicks(7239) },
                    { 4, 2, "6 PM sharp. Be there early.", 3, 4, new DateTime(2025, 6, 26, 17, 4, 1, 679, DateTimeKind.Utc).AddTicks(7240) },
                    { 5, 3, "New message!", 6, 5, new DateTime(2025, 6, 26, 17, 2, 1, 679, DateTimeKind.Utc).AddTicks(7241) }
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
