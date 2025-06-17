using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using PulsePitch.Models;
using PulsePitch.Data;
using Microsoft.EntityFrameworkCore;

namespace PulsePitch.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private PulsePitchDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public AuthController(PulsePitchDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

[HttpPost("login")]
public async Task<IActionResult> Login([FromHeader(Name = "Authorization")] string authHeader)
{
    try
    {
        string encodedCreds = authHeader.Substring(6).Trim();
        string creds = Encoding
            .GetEncoding("iso-8859-1")
            .GetString(Convert.FromBase64String(encodedCreds));

        int separator = creds.IndexOf(':');
        string email = creds.Substring(0, separator);
        string password = creds.Substring(separator + 1);

        var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);

        if (user == null)
            return Unauthorized();

        var userRoles = _dbContext.UserRoles.Where(ur => ur.UserId == user.Id).ToList();
        var hasher = new PasswordHasher<IdentityUser>();
        var result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);

        if (result == PasswordVerificationResult.Success)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            foreach (var userRole in userRoles)
            {
                var role = _dbContext.Roles.FirstOrDefault(r => r.Id == userRole.RoleId);
                if (role != null)
                    claims.Add(new Claim(ClaimTypes.Role, role.Name));
            }

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity));

            return Ok(new { message = "Login successful", username = user.UserName, email = user.Email });
        }

        return Unauthorized();
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
        return StatusCode(500, $"Internal error: {ex.Message}");
    }
}

    [HttpGet]
    [Route("logout")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public IActionResult Logout()
    {
        try
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme).Wait();
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500);
        }
    }

    [HttpGet("me")]
    [Authorize]
    public IActionResult Me()
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);
        var playerTeams = _dbContext.PlayerTeams.Where(pt => pt.PlayerId == profile.Id).ToList();
        var roles = User.FindAll(ClaimTypes.Role).Select(r => r.Value).ToList();
        if (profile != null)
        {
            profile.UserName = User.FindFirstValue(ClaimTypes.Name);
            profile.Email = User.FindFirstValue(ClaimTypes.Email);
            profile.Roles = roles;
            profile.Teams = playerTeams;
            return Ok(profile);
        }
        return NotFound();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(Registration registration)
    {
        var user = new IdentityUser
        {
            UserName = registration.UserName,
            Email = registration.Email
        };

        var password = Encoding
            .GetEncoding("iso-8859-1")
            .GetString(Convert.FromBase64String(registration.Password));

        var result = await _userManager.CreateAsync(user, password);
        if (result.Succeeded)
        {

            await _userManager.AddToRoleAsync(user, "player");

            _dbContext.UserProfiles.Add(new UserProfile
            {
                FirstName = registration.FirstName,
                LastName = registration.LastName,
                CreateDateTime = DateTime.Now,
                IdentityUserId = user.Id,
            });
            _dbContext.SaveChanges();

            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity)).Wait();

            return Ok();
        }
        return BadRequest(new { Errors = result.Errors.Select(ir => ir.Description) });
    }
}