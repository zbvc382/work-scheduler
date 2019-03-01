using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class Landlord {

        public Landlord()
        {
            Jobs = new List<Job>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public virtual LandlordAddress Address { get; set; }
        public virtual ICollection<Job> Jobs { get; set; }
    }
}