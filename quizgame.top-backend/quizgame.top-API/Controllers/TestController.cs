using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace quizgame.top.API.Controllers;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    #region constructor

    private readonly ILogger<TestController> Logger;

    public TestController(ILogger<TestController> logger)
    {
        Logger = logger;
    }

    #endregion

    #region methods

    [EnableCors("policy1")]
    [HttpGet("test-endpoint")]
    public string TestEndpoint()
    {
        string message = "[{\"message\": \"The time is: " + DateTime.UtcNow.ToString() + "\"}]";
        Logger.Log(LogLevel.Information, "test-endpoint was called from " + Request.Headers["Referer"].ToString() + " and returned: " + message); 
        return message;
    }

    #endregion

}
