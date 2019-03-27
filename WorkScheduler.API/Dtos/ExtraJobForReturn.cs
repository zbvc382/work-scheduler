using System;

namespace WorkScheduler.API.Dtos
{
    public class ExtraJobForReturn
    {
        public int Id { get; set; }
        public string PayerType { get; set; }
        public string ApplianceType { get; set; }
        public string ProblemGiven { get; set; }
        public string Address { get; set; }
        public string PostCode { get; set; }
        public DateTime TimeFrom { get; set; }
        public DateTime TimeTo { get; set; }
        public bool Key { get; set; }
        public string KeyAddress { get; set; }
        public string AgencyReference { get; set; }
        public string LandlordName { get; set; }
        public string LandlordPhone { get; set; }
        public string TenantName { get; set; }
        public string TenantPhone { get; set; }
        public string PrivateName { get; set; }
        public string PrivatePhone { get; set; }
        public string AgencyContactName { get; set; }
        public string AgencyPhone { get; set; }
        public AgencyForReturnDto Agency { get; set; }
        
    }
}
