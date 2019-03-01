using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class Tenant {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        
        public ICollection<Job> Jobs { get; set; }
    }
}