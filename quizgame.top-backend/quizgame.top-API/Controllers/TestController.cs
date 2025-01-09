using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace quizgame.top.API.Controllers;

/// <summary>
/// Test class used to create example endpoints that can be used as a template 
/// </summary>
[ApiController]
[Route("test/")]
public class TestController(ILogger<TestController> logger) : ControllerBase
{
    
    /// <summary>
    /// Example GET endpoint
    /// </summary>
    /// <returns>the current time as a JSON formatted string</returns>
    [EnableCors("policy1")]
    [HttpGet("get")]
    public string GetEndpoint()
    {
        string message = $$""" { "message": "The time is {{DateTime.UtcNow}}" } """;

#if DEBUG
        string caller = Request.Headers.Referer.ToString();
        logger.Log(LogLevel.Information, $"endpoint test/get was called from {caller} and returned: {message}"); 
#endif
        
        return message;
    }

    /// <summary>
    /// Example POST endpoint
    /// </summary>
    /// <returns>the current counter value after being incremented by the passed amount</returns>
    [EnableCors("policy1")]
    [HttpGet("post/{id}")]
    public string PostEndpoint(int id)
    {
        string message = $$""" { "message" : "input = id" } """;

#if DEBUG
        string caller = Request.Headers.Referer.ToString();
        logger.Log(LogLevel.Information, $"endpoint test/post/{id} was called from {caller} and returned: {message}");
#endif

        return message;
    }
}
