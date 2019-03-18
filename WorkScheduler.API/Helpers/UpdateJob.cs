using System.Collections.Generic;

namespace WorkScheduler.API.Helpers
{
    public class UpdateJob
    {
        public int Id { get; set; }
        public string Report { get; set; }
        public IList<int> TagIds { get; set; }
    }
}