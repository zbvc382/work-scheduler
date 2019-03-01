using System;
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
        public bool slotReplaced { get; set; }
        public int slotIndex { get; set; }

        public virtual PropertyAddress PropertyAddress { get; set; }
        public virtual Agency Agency { get; set; }
        public virtual Landlord Landlord { get; set; }
        public virtual Private Private { get; set; }
        public virtual Tenant Tenant { get; set; }
    }
}