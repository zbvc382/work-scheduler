using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Helpers;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class JobRepository : RepositoryBase<Job>, IJobRepository
    {
        public JobRepository(DataContext dataContext) : base(dataContext) { }

        public async Task<List<Job>> GetJobs()
        {
            return await FindAll().ToListAsync();
        }

        public async Task<Job> GetJob(int id)
        {
            return await FindAll()
                .Include(Job => Job.Agency)
                .FirstOrDefaultAsync(j => j.Id == id);
        }

        public async Task<List<Job>> GetJobsByWeek(DateTime start)
        {
            var end = BusinessDays.getEndDate(start);
            return await FindByCondition(x => x.DateAssigned >= start && x.DateAssigned < end)
                .Include(Job => Job.Agency)
                .ToListAsync();
        }
    }
}