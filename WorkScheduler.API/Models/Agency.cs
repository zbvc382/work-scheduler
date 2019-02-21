using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkScheduler.API.Models
{
    [Table("agency")]
    public class Agency {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ContactName { get; set; }
        public string PhoneNumber { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
    }
}