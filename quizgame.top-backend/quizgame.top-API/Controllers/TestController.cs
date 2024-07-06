using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace quizgame.top.API.Controllers;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    #region constructor

    private readonly ILogger<TestController> Logger;
    private Data data;

    public TestController(ILogger<TestController> logger)
    {
        Logger = logger;
        data = Data.Instance;
    }

    #endregion

    #region properties
    

    #endregion

    #region endpoints

    [EnableCors("policy1")]
    [HttpGet("get")]
    public string GetEndpoint()
    {
        string message = $$""" { "message": "The time is {{DateTime.UtcNow}}" } """;

#if DEBUG
        string caller = Request.Headers.Referer.ToString();
        Logger.Log(LogLevel.Information, $"endpoint api/test/get was called from {caller} and returned: {message}"); 
#endif
        
        return message;
    }

    [EnableCors("policy1")]
    [HttpGet("post/{id}")]
    public string PostEndpoint(int id)
    {

        data.Count += id;
        string message = $$""" { "message" : "Counter = {{data.Count}}" } """;

#if DEBUG
        string caller = Request.Headers.Referer.ToString();
        Logger.Log(LogLevel.Information, $"endpoint api/test/post/{id} was called from {caller} and returned: {message}");
#endif

        return message;
    }

    #endregion

}
