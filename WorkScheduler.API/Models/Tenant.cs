namespace WorkScheduler.API.Models
{
    public class Tenant {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Agency Agency { get; set; }
    }
}