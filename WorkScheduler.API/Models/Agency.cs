using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class Agency {

        public Agency()
        {
            Jobs = new List<Job>();
        }

        public int Id { get; set; }
        public string AgencyName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        
        public virtual AgencyAddress AgencyAddress { get; set; }
        public virtual ICollection<Job> Jobs { get; set; }

    }
}