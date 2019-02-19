using System;
using System.Collections.Generic;

namespace WorkScheduler.API.Models
{
    public class Agency {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ContactName { get; set; }
        public string PhoneNumber { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string PostCode { get; set; }
        public ICollection<Tenant> Tenants { get; set; }
        public ICollection<Job> Jobs { get; set; }
    }
}