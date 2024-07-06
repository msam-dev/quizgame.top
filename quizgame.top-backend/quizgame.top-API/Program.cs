namespace quizgame.top.API;

public class Program
{
    public static void Main(string[] args)
    {
        string[] origins = ["https://quizgame.top"];

        #if DEBUG 
            origins = ["http://localhost:5173"]; 
        #endif

        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "policy1",
                policy =>
                {
                    // WithOrigins() specifies which URL's are allowed to call endpoints that use this policy 
                    policy.WithOrigins(origins)
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
        });

        builder.Services.AddControllers();

        WebApplication app = builder.Build();

        app.UseCors();

        //app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
