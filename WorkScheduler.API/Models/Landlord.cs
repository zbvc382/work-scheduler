using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    public class Landlord {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int? AddressId { get; set; }
        public Address Address { get; set; }
    }
}