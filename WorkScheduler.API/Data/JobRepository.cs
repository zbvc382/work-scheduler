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
            return await FindAll().Include(j => j.JobTags).ToListAsync();
        }

        public async Task<Job> GetJobAsync(int id)
        {
            return await FindAll().FirstOrDefaultAsync(j => j.Id == id);
        }

        public Job GetJob(int id)
        {
            return FindAll().Include(j => j.JobTags).FirstOrDefault(j => j.Id == id);
        }

        public async Task<List<Job>> GetJobsByWeek(DateTime start)
        {
            var end = BusinessDays.getEndDate(start);
            return await FindByCondition(x => x.DateAssigned >= start && x.DateAssigned < end)
                .ToListAsync();
        }

        public async Task<PagedJobs<Job>> SearchAllJobs(SearchParams searchParams)
        {
            IQueryable<Job> jobs;

            if (searchParams.DateFrom != null)
            {
                jobs = FindByCondition(x => x.DateAssigned >= searchParams.DateFrom &&
                (x.Address.ContainsWords(searchParams.Query)
                || x.PostCode.ContainsWords(searchParams.Query)
                || x.AgencyReference.ContainsWords(searchParams.Query)
                || x.AgencyName.ContainsWords(searchParams.Query)
                || x.LandlordName.ContainsWords(searchParams.Query)
                || x.LandlordPhone.ContainsWords(searchParams.Query)
                || x.PrivateName.ContainsWords(searchParams.Query)
                || x.PrivatePhone.ContainsWords(searchParams.Query)
                || x.ProblemGiven.ContainsWords(searchParams.Query)
                || x.TenantName.ContainsWords(searchParams.Query)
                || x.TenantPhone.ContainsWords(searchParams.Query)
                )).OrderByDescending(x => x.DateAssigned);
            }

            else
            {
                jobs = FindByCondition(x => x.Address.ContainsWords(searchParams.Query)
                || x.PostCode.ContainsWords(searchParams.Query)
                || x.AgencyReference.ContainsWords(searchParams.Query)
                || x.AgencyName.ContainsWords(searchParams.Query)
                || x.LandlordName.ContainsWords(searchParams.Query)
                || x.LandlordPhone.ContainsWords(searchParams.Query)
                || x.PrivateName.ContainsWords(searchParams.Query)
                || x.PrivatePhone.ContainsWords(searchParams.Query)
                || x.ProblemGiven.ContainsWords(searchParams.Query)
                || x.TenantName.ContainsWords(searchParams.Query)
                || x.TenantPhone.ContainsWords(searchParams.Query)
                ).OrderByDescending(x => x.DateAssigned);
            }

            return await PagedJobs<Job>.CreateAsync(jobs, searchParams.PageNumber, searchParams.PageSize);
        }

        public void AddTag(Tag tag, Job job) {
            job.JobTags.Add(new JobTag
            {
                Job = job,
                Tag = tag
            }
            );
        }
    }
}