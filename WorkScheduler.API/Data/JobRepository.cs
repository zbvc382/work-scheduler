using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Helpers;
using WorkScheduler.API.Models;
using WorkScheduler.API.Extensions;

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
                .FirstOrDefaultAsync(j => j.Id == id);
        }

        public async Task<List<Job>> GetJobsByWeek(DateTime start)
        {
            var end = BusinessDays.getEndDate(start);
            return await FindByCondition(x => x.DateAssigned >= start && x.DateAssigned < end)
                .ToListAsync();
        }

        public async Task<List<Job>> SearchAllJobs(string query)
        {
            return await FindByCondition(x => x.Address.ContainsWords(query)
            || x.PostCode.ContainsWords(query)
            || x.AgencyReference.ContainsWords(query)
            || x.AgencyName.ContainsWords(query)
            || x.LandlordName.ContainsWords(query)
            || x.LandlordPhone.ContainsWords(query)
            || x.PrivateName.ContainsWords(query)
            || x.PrivatePhone.ContainsWords(query)
            || x.ProblemGiven.ContainsWords(query)
            || x.TenantName.ContainsWords(query)
            || x.TenantPhone.ContainsWords(query)
            ).ToListAsync();
        }
    }
}