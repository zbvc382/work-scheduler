using System.Collections.Generic;

namespace WorkScheduler.API.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }

        public virtual ICollection<JobTag> JobTags { get; set; }
    }
}