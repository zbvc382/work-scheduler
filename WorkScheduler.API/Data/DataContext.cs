using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        
        public DbSet<Agency> Agencies { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Landlord> Landlords { get; set; }
        public DbSet<Private> Privates { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<AgencyAddress> AgencyAddresses { get; set; }
        public DbSet<PropertyAddress> PropertyAddress { get; set; }
        public DbSet<LandlordAddress> LandlordAddress { get; set; }
    }
}