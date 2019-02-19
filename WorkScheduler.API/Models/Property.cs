using System.Collections.Generic;

namespace WorkScheduler.API.Models
{
    public class Property {
        public string Number { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string PostCode { get; set; }
        public ICollection<Job> Jobs { get; set; }
    }
}