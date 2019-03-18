using System;
using System.Collections.Generic;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Dtos
{
    public class JobToReturnDto
    {
        public int Id { get; set; }
        public string JobNumber { get; set; }
        public int Visit { get; set; }
        public string PayerType { get; set; }
        public string ApplianceType { get; set; }
        public string ProblemGiven { get; set; }
        public DateTime DateAssigned { get; set; }
        public DateTime TimeFrom { get; set; }
        public DateTime TimeTo { get; set; }
        public string Address { get; set; }
        public string PostCode { get; set; }
        public string Report { get; set; }
        public bool slotReplaced { get; set; }
        public int? slotIndex { get; set; }
        public bool Key { get; set; }
        public string KeyAddress { get; set; }
        public string AgencyReference { get; set; }
        public string LandlordName { get; set; }
        public string LandlordPhone { get; set; }
        public string TenantName { get; set; }
        public string TenantPhone { get; set; }
        public string PrivateName { get; set; }
        public string PrivatePhone { get; set; }
        public AgencyToReturnDto Agency { get; set; }

        public virtual ICollection<TagToReturnDto> Tags { get; set; }
    }
}