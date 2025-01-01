using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace quizgame.top.API.Controllers;

// user model
public class User
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

// login request model
public class LoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}


/// <summary>
/// c
/// </summary>
[ApiController]
[Route("user/")]
public class UserController(ILogger<TestController> logger, IConfiguration configuration) : ControllerBase
{
    [EnableCors("policy1")]
    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        // mock user data// replace with hashed passwords in production
        User user = new User
        {
            Username = "username123",
            Password = "password123"
        };

        if (user.Username != request.Username || user.Password != request.Password)
        {
            return Unauthorized(new { message = "Invalid username or password" });
        }

        string token = GenerateJwtToken(user);
        return Ok(new { token });
    }

    //TODO: fix JWT KEY, ISSUER, AND AUDIENCE 
    private string GenerateJwtToken(User user)
    {
        string key = "abc123-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        Claim[] claims = [ new Claim(ClaimTypes.Name, user.Username) ];

        JwtSecurityToken token = new JwtSecurityToken(
            issuer: "Jwt:Issuer",
            audience: "Jwt:Audience",
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }    
}
