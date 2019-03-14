namespace WorkScheduler.API.Helpers
{
    public class PaginationHeader
    {
        public int TotalItems { get; set; }

        public PaginationHeader(int totalItems)
        {
            TotalItems = totalItems;
        }
    }
}