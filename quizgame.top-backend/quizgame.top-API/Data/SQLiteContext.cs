using Microsoft.EntityFrameworkCore;
using quizgame.top.API.Models;

namespace quizgame.top.API.Data;

public class SQLiteContext : DbContext
{
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder model)
    {
        // this method is redundant, but leaving it here incase i need to implement it in future
        base.OnModelCreating(model);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite("Data Source=app.db");
    }
}