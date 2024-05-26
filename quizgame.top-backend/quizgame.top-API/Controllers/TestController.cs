using Microsoft.AspNetCore.Mvc;

namespace quizgame.top_API.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> Logger;

        public TestController(ILogger<TestController> logger)
        {
            Logger = logger;
        }

        [HttpGet("test-endpoint")]
        public string Get()
        {
            Logger.Log(LogLevel.Information, "test-endpoint was called"); 
            return "The time is: " + DateTime.UtcNow.ToString();
        }
    }
}
