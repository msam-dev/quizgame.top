namespace quizgame.top.API.Configurations;

public static class CorsConfiguration
{
    public static void ConfigureCors(this IServiceCollection services)
    {
        string[] origins = ["https://quizgame.top"];

        #if DEBUG
                origins = ["https://localhost:5174"];
        #endif

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
