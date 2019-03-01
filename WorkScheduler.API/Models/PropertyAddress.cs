using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class PropertyAddress
    {
        public int Id { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string PostCode { get; set; }
        
        public ICollection<Job> Jobs { get; set; }
    }
}