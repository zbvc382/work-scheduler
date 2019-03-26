using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WorkScheduler.API.Helpers
{
    public class UpdateJob
    {
        public int Id { get; set; }

        [MaxLength(200)]
        public string Report { get; set; }
        
        public IList<int> SelectedTags { get; set; }
        public IList<int> UnselectedTags { get; set; }
    }
}