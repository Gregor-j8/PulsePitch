using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using PulsePitch.Data;
using PulsePitch.Models;
using PulsePitch.Mapper;
using AutoMapper;
using PulsePitch.Interfaces;
using PulsePitch.Repository;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(opts =>
{
    opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
    {
        options.Cookie.Name = "PulsePitchLoginCookie";
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.Cookie.HttpOnly = true; //The cookie cannot be accessed through JS (protects against XSS)
        options.Cookie.MaxAge = new TimeSpan(7, 0, 0, 0); // cookie expires in a week regardless of activity
        options.SlidingExpiration = true; // extend the cookie lifetime with activity up to 7 days.
        options.ExpireTimeSpan = new TimeSpan(24, 0, 0); // Cookie will expire in 24 hours without activity
        options.Events.OnRedirectToLogin = (context) =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = (context) =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
    });

builder.Services.AddIdentityCore<IdentityUser>(config =>
            {
                //for demonstration only - change these for other projects
                config.Password.RequireDigit = false;
                config.Password.RequiredLength = 8;
                config.Password.RequireLowercase = false;
                config.Password.RequireNonAlphanumeric = false;
                config.Password.RequireUppercase = false;
                config.User.RequireUniqueEmail = true;
            })
    .AddRoles<IdentityRole>()  //add the role service.  
    .AddEntityFrameworkStores<PulsePitchDbContext>();

// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<PulsePitchDbContext>(builder.Configuration["PulsePitchDbConnectionString"]);

builder.Services.AddScoped<ITeamRepository, TeamRepository>();
builder.Services.AddScoped<IPlayerTeamRepository, PlayerTeamRepository>();
builder.Services.AddScoped<ITeamEventRepository, EventRepository>();
builder.Services.AddScoped<IEventRepository, EventsRepository>();
builder.Services.AddScoped<IUserProfileRepository, UserProfileRepository>();
builder.Services.AddScoped<ITeamGameRepository, TeamGameRepository>();
builder.Services.AddScoped<IFormationRepository, FormationRepository>();
builder.Services.AddScoped<IPlayersInFormationRepository, PlayersInFormationRepository>();
builder.Services.AddScoped<IMessageRepository, MessagesRepository>();
builder.Services.AddScoped<IMatchRequestRepository, MatchRequestRepository>();
builder.Services.AddScoped<IChatRoomRepository, ChatRoomRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();