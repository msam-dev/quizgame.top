using Microsoft.AspNetCore.Authentication.Cookies;
namespace quizgame.top.API.Configurations;
public static class CookieConfiguration
{
    public static void ConfigureCookies(this IServiceCollection services)
    {
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
        {
            options.Cookie.Name         = "quizgame.top.Auth";
            options.Cookie.HttpOnly     = true;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.SameSite     = SameSiteMode.Lax;
            options.Cookie.MaxAge       = TimeSpan.FromDays(2);
            options.Cookie.Path         = "/";
            options.Events  = new CookieAuthenticationEvents
            {
                OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    return Task.CompletedTask;
                }
            };
        });
    }
}