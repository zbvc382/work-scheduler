using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class Agency {
        public int Id { get; set; }
        public string AgencyName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        
        public int AgencyAddressId { get; set; }
        public AgencyAddress AgencyAddress { get; set; }

        public ICollection<Job> Jobs { get; set; }
    }
}