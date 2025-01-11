using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using quizgame.top.API.Data;
using quizgame.top.API.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace quizgame.top.API.Controllers;

/// <summary>
/// Controller for user authentication
/// </summary>
[ApiController]
[Route("user/")]
public class UserController(ILogger<TestController> logger, IConfiguration config, SQLiteContext context) : ControllerBase
{

    private readonly PasswordHasher<User> hasher = new PasswordHasher<User>();

    #region Endpoints

    /// <summary>
    /// User login api endpoint
    /// </summary>
    [EnableCors("policy1")]
    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync(LoginRequest request)
    {
        Thread.Sleep(2000);

        try
        {
            User? user = await context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null)
            {
                return NotFound(new { Message = "Login failed. Username does not exist." });
            }

            PasswordVerificationResult verify = hasher.VerifyHashedPassword(user, user.Password, request.Password);
            if (verify == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new { message = "Invalid username or password." });
            }

            bool authenticated = await AutheticateUser(user);
            if (!authenticated) throw new Exception("Error, could not authenticate user after confirming password");

            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Login endpoint threw and error while trying to login user: {request.Username}");
            return StatusCode(500, new { Message = "An error occurred while processing your login request." }); // 500 Internal Server Error
        }
    }

    /// <summary>
    /// User signup api endpoint
    /// </summary>
    [EnableCors("policy1")]
    [HttpPost("signup")]
    public async Task<IActionResult> SignupAsync(SignupRequest request)
    {
        Thread.Sleep(2000);
        try
        {
            bool usernameExists = await context.Users.AnyAsync(u => u.Username == request.Username);

            if (usernameExists)
            {
                return Conflict(new { Message = "Username already exists, please try again." });
            }

            User user = new User
            {
                Username = request.Username,
                Password = request.Password,
                CreatedAt = DateTime.UtcNow,
            };

            user.Password = hasher.HashPassword(user, request.Password);

            context.Users.Add(user);
            await context.SaveChangesAsync();

            bool authenticated = await AutheticateUser(user);
            if (!authenticated) throw new Exception("Error, could not authenticate user after signup");

            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Signup endpoint threw and error while trying to create user: {request.Username}");
            return StatusCode(500, new { Message = "An error occurred while processing your signup request." }); // 500 Internal Server Error
        }
    }

    [Authorize]
    [EnableCors("policy1")]
    [HttpPost("score")]
    public async Task<IActionResult> Score()
    {
        string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        User? user = await context.Users.FindAsync(int.Parse(userId));
        if (user == null) return NotFound();

        user.Score += 1;
        await context.SaveChangesAsync();
        int score  = user.Score;
        return Ok( new {score} );
    }

    [Authorize]
    [EnableCors("policy1")]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        try
        {
            await HttpContext.SignOutAsync();

            Response.Cookies.Append("quizgame.top.Auth", "", new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddDays(-1), // Set expiration in the past
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/" 
            });

            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Logout endpoint threw and error while trying to logout a user");
            return StatusCode(500, new { Message = "An error occurred while processing your logout." }); // 500 Internal Server Error
        }
    }

    /// <summary>
    /// Endpoint to check if a user has a valid, current authentication
    /// </summary>
    [Authorize]
    [EnableCors("policy1")]
    [HttpGet("loggedin")]
    public async Task<IActionResult> LoggedInAsync()
    {
        string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        User? user = await context.Users.FindAsync(int.Parse(userId));
        if (user == null) return NotFound();

        return Ok(new { username = user.Username });
    }

    #endregion

    #region Methods

    /// <summary>
    /// Authenticates user using Cookies
    /// </summary>
    private async Task<bool> AutheticateUser(User user)
    {
        try
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            string scheme = CookieAuthenticationDefaults.AuthenticationScheme;
            ClaimsIdentity identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            ClaimsPrincipal principal = new ClaimsPrincipal(identity);
            AuthenticationProperties properties = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTime.UtcNow.AddHours(48)
            };

            await HttpContext.SignInAsync(
                scheme,
                principal,
                properties
            );

            return true;
        }
        catch
        {
            return false;
        }
    }

    #endregion

}
