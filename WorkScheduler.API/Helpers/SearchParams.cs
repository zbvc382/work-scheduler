namespace WorkScheduler.API.Helpers
{
    public class SearchParams
    {
        public string Query { get; set; }
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get { return _pageSize;}
        }
    }
}