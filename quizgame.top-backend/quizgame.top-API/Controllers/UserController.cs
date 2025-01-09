using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using quizgame.top.API.Data;
using quizgame.top.API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace quizgame.top.API.Controllers;

/// <summary>
/// Controller for user authentication
/// </summary>
[ApiController]
[Route("user/")]
public class UserController(ILogger<TestController> logger, SQLiteContext context) : ControllerBase
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

            string token = GenerateJwtToken(request.Username);
            return Ok(new { request.Username, token });
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

            string token = GenerateJwtToken(request.Username);

            return Ok(new { request.Username, token });
        }
        catch (Exception ex)
        {
            logger.LogError( ex, $"Signup endpoint threw and error while trying to create user: {request.Username}");
            return StatusCode(500, new { Message = "An error occurred while processing your signup request." }); // 500 Internal Server Error
        }
    }

    #endregion

    #region Methods

    private string GenerateJwtToken(string username)
    {
        string key = "abc123-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        Claim[] claims = [ new Claim(ClaimTypes.Name, username) ];

        JwtSecurityToken token = new JwtSecurityToken(
            issuer: "Jwt:Issuer",
            audience: "Jwt:Audience",
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    #endregion

}
