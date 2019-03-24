using System;
using System.ComponentModel.DataAnnotations;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Dtos
{
    public class JobForCreationDto
    {
        [Required]
        public string PayerType { get; set; }

        public string ApplianceType { get; set; }

        [MaxLength(400)]
        public string ProblemGiven { get; set; }

        [Required]
        public DateTime DateAssigned { get; set; }

        [Required]
        public DateTime TimeFrom { get; set; }

        [Required]
        public DateTime TimeTo { get; set; }

        [Required, MaxLength(60)]
        public string Address { get; set; }

        [Required, MinLength(6), MaxLength(8)]
        public string PostCode { get; set; }

        [Required]
        public bool slotReplaced { get; set; }

        public int? slotIndex { get; set; }

        [Required]
        public bool Key { get; set; }

        [MaxLength(60)]
        public string KeyAddress { get; set; }

        [MaxLength(20)]
        public string AgencyReference { get; set; }

        [MaxLength(30)]
        public string LandlordName { get; set; }

        [MaxLength(15)]
        public string LandlordPhone { get; set; }

        [MaxLength(30)]
        public string TenantName { get; set; }

        [MaxLength(15)]
        public string TenantPhone { get; set; }

        [MaxLength(30)]
        public string PrivateName { get; set; }

        [MaxLength(15)]
        public string PrivatePhone { get; set; }

        [MaxLength(30)]
        public string AgencyContactName { get; set; }

        [MaxLength(15)]
        public string AgencyPhone { get; set; }

        public Agency Agency { get; set; }
    }
}