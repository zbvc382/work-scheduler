using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class PropertyAddress
    {
        public PropertyAddress()
        {
            Jobs = new List<Job>();
        }
        
        public int Id { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string PostCode { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }
    }
}