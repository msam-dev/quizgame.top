using quizgame.top.API.Configurations;
using quizgame.top.API.Data;

namespace quizgame.top.API;

public class Program
{
    public static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Services.ConfigureCors();

        builder.Services.AddControllers();

        builder.Services.AddDbContext<SQLiteContext>();

        builder.Services.ConfigureCookies();

        builder.Services.AddAuthorization();

        WebApplication app = builder.Build();

        app.UseCors();

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        //app.UseHttpsRedirection();

        app.Run();
    }
}
