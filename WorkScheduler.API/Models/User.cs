using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace WorkScheduler.API.Models
{
    public class User : IdentityUser
    {
        public ICollection<Job> Jobs { get; set; }
    }
}