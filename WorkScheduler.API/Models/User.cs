using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace WorkScheduler.API.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public ICollection<Job> Jobs { get; set; }
        
    }
}