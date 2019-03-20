using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<JobTag>()
                .HasKey(bc => new { bc.JobId, bc.TagId });
            modelBuilder.Entity<JobTag>()
                .HasOne(bc => bc.Job)
                .WithMany(b => b.JobTags)
                .HasForeignKey(bc => bc.JobId);
            modelBuilder.Entity<JobTag>()
                .HasOne(bc => bc.Tag)
                .WithMany(c => c.JobTags)
                .HasForeignKey(bc => bc.TagId);
        }

        public DbSet<Agency> Agencies { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<JobTag> JobTags { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}