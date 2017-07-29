using Microsoft.EntityFrameworkCore;
using InstagramApp.Models;

namespace InstagramApp.DataAccess.Mapping
{
    public class UserMapping
    {
        public UserMapping(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("user");

            //modelBuilder.Entity<User>(entity =>
            //{
            //    entity.Property(e => e.Id).IsRequired();
            //});

            //modelBuilder.Entity<User>(entity =>
            //{
                //entity.HasOne(d => d.Blog)
                //    .WithMany(p => p.Post)
                //    .HasForeignKey(d => d.BlogId);
            //});
        }
    }
}
