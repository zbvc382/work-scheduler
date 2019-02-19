using System;

namespace WorkScheduler.API.Models
{
    public class Tenant {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Guid AgencyId { get; set; }
        public Agency Agency { get; set; }
    }
}