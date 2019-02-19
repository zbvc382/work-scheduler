using System;

namespace WorkScheduler.API.Models
{
    public class Job
    {
        public Guid Id { get; set; }
        public string PayerType { get; set; }
        public string ApplianceType { get; set; }
        public string ProblemGiven { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateAssigned { get; set; }
        public DateTime TimeFrom { get; set; }
        public DateTime TimeTo { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid PropertyId { get; set; }
        public Property Property { get; set; }
        public Guid AgencyId { get; set; }
        public Agency Agency { get; set; }
        public Guid LandlordId { get; set; }
        public Landlord Landlord { get; set; }
        public Guid PrivateId { get; set; }
        public Private Private { get; set; }
    }
}