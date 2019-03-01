using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class Tenant {

        public Tenant()
        {
            Jobs = new List<Job>();
        }
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }
    }
}