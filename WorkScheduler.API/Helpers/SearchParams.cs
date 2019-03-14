using System;

namespace WorkScheduler.API.Helpers
{
    public class SearchParams
    {
        public string Query { get; set; }
        public int PageNumber { get; set; } = 1;
        public DateTime? DateFrom { get; set; }
        private const int _pageSize = 10;
        public int PageSize
        {
            get { return _pageSize;}
        }
    }
}