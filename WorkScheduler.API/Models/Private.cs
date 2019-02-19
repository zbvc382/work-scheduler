using System.Collections.Generic;

namespace WorkScheduler.API.Models
{
    public class Private {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<Job> Jobs { get; set; }
    }
}