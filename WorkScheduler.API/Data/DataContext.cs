using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Agency> Agencies { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Landlord> Landlords { get; set; }
        public DbSet<Private> Privates { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<AgencyAddress> AgencyAddresses { get; set; }
        public DbSet<PropertyAddress> PropertyAddresses { get; set; }
        public DbSet<LandlordAddress> LandlordAddresses { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     // base.OnModelCreating(modelBuilder);

        //     // modelBuilder.Entity<Job>().Has

        //     //modelBuilder.Configurations.Add(new ResourceConfiguration());
        //     //modelBuilder.Configurations.Add(new OperationsToRolesConfiguration());
        // }
    }
}