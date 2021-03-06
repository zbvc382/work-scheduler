using System.Collections.Generic;

namespace WorkScheduler.API.Models
{
    public class Agency
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Job> Jobs { get; set; }
    }
}