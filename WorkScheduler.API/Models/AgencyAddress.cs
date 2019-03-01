using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class AgencyAddress
    {
        public int Id { get; set; }

        [ForeignKey("Agency")]
        public int AgencyId { get; set; }
        
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string PostCode { get; set; }

        public virtual Agency Agency { get; set; }
    }
}