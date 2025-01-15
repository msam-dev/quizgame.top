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

            return Ok(new { user.Username, user.AnswerCount, user.CorrectCount, CreatedAt = user.CreatedAt.ToString("dd-MMM-yyyy")});
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

            return Ok(new { user.Username, user.AnswerCount, user.CorrectCount, CreatedAt = user.CreatedAt.ToString("dd-MMM-yyyy") });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Signup endpoint threw and error creating user: {request.Username}");
            return StatusCode(500, new { Message = "An error occurred while processing your signup request." }); // Internal Server Error
        }
    }

    /// <summary>
    /// A user submits an answer
    /// </summary>
    /// <param name="correct">Did the user get the answer correct</param>
    [Authorize]
    [EnableCors("policy1")]
    [HttpPost("add-answer")]
    public async Task<IActionResult> AddAnswer(AddAnswerRequest request)
    {
        try
        {
            string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            User? user = await context.Users.FindAsync(int.Parse(userId));
            if (user == null) return NotFound();

            user.AnswerCount++;
            if (request.Correct) user.CorrectCount++;

            await context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "AddAnswer endpoint threw an error");
            return StatusCode(500); // Internal Server Error
        }
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
            logger.LogError(ex, "Logout endpoint threw an error");
            return StatusCode(500, new { Message = "An error occurred while processing your logout." }); // Internal Server Error
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

        return Ok(new { user.Username, user.AnswerCount, user.CorrectCount, user.CreatedAt });
    }

    record struct LeaderboardEntry(string Username, int AnswerCount, int CorrectCount, int Score);

    /// <summary>
    /// Endpoint to get leaderboard of the top 20 users as JSON
    /// </summary>
    [EnableCors("policy1")]
    [HttpGet("leaderboard")]
    public async Task<IActionResult> Leaderboard()
    {
        // Using anonymous type to return leaderboard as JSON
        List<LeaderboardEntry> leaderboard = await context.Users
            .Select(u => new LeaderboardEntry 
            {
                Username = u.Username,
                AnswerCount = u.AnswerCount,
                CorrectCount = u.CorrectCount,
                Score = (u.CorrectCount - (u.AnswerCount - u.CorrectCount))
            })
            .OrderByDescending(l => l.Score)
            .Take(20) // Limit to top 20
            .ToListAsync();

        return Ok(leaderboard);
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
