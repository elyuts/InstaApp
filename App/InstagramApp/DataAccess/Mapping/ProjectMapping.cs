using Microsoft.EntityFrameworkCore;
using InstagramApp.Models;

namespace InstagramApp.DataAccess.Mapping
{
    public class ProjectMapping
    {
        public ProjectMapping(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>().ToTable("project");
        }
    }
}
