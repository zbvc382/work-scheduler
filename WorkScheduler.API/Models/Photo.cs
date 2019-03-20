namespace WorkScheduler.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
    }
}