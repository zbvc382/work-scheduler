using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string PayerType { get; set; }
        public string ApplianceType { get; set; }
        public string ProblemGiven { get; set; }
        public DateTime DateAssigned { get; set; }
        public DateTime TimeFrom { get; set; }
        public DateTime TimeTo { get; set; }
        public string Address { get; set; }
        public string PostCode { get; set; }
        public bool slotReplaced { get; set; }
        public int? slotIndex { get; set; }

        public int AgencyId { get; set; }
        public Agency Agency { get; set; }

        public int LandlordId { get; set; }
        public Landlord Landlord { get; set; }

        public int PrivateId { get; set; }
        public Private Private { get; set; }

        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
    }
}