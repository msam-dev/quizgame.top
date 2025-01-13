namespace quizgame.top.API.Configurations;

public static class CorsConfiguration
{
    public static void ConfigureCors(this IServiceCollection services)
    {
        string[] origins = ["https://quizgame.top"];

        #if DEBUG
                origins = ["https://localhost:5173"];
#endif

        /*string[] origins = ["https://quizgame.top"];

        #if DEBUG 
            origins = ["http://localhost:5173"]; 
        #endif

        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "policy1",
                policy =>
                {
                    policy.WithOrigins(origins) // specifies which URL's are allowed to call endpoints that use this policy 
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
        });*/

        services.AddCors(options =>
        {
            options.AddPolicy("policy1", policy =>
            {
                policy.WithOrigins(origins)
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
            });
        });
    }
}
