using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class LandlordAddress
    {
        public int Id { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string PostCode { get; set; }

        [ForeignKey("Landlord")]
        public int LandlordId { get; set; }
        public virtual Landlord Landlord { get; set; }
    }
}