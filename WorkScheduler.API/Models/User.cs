using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace WorkScheduler.API.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            Jobs = new List<Job>();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }
    }
}