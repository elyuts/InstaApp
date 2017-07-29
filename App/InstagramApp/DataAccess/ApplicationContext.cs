using Microsoft.EntityFrameworkCore;
using InstagramApp.DataAccess.Mapping;
using InstagramApp.Models;

namespace InstagramApp.DataAccess.Context
{
    public class ApplicationContext : DbContext
    {
        public static string SqlConnectionString;

        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(SqlConnectionString, b => b.MigrationsAssembly("AspNet5MultipleProject"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new UserMapping(modelBuilder);
            new ProjectMapping(modelBuilder);
        }
    }
}
