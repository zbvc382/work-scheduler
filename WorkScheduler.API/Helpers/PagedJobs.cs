using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WorkScheduler.API.Helpers
{
    public class PagedJobs<Job> : List<Job>
    {
        public int TotalCount { get; set; }

        public PagedJobs(List<Job> items, int count)
        {
            TotalCount = count;
            this.AddRange(items);
        }

        public static async Task<PagedJobs<Job>> CreateAsync(IQueryable<Job> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedJobs<Job>(items, count);
        }
    }
}
