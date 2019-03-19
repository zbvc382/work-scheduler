using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkScheduler.API.Helpers;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public interface IJobRepository : IRepositoryBase<Job>
    {
        Task<Job> AddJob(Job job);
        Task<List<Job>> GetJobs();
        Task<Job> GetJobAsync(int id);
        Job GetJob(int id);
        Task<List<Job>> GetJobsByWeek(DateTime start);
        Task<PagedJobs<Job>> SearchAllJobs(SearchParams searchParams);
        void AddTag(Tag tag, Job job);
        void UpdateTags(UpdateJob updateJob);
    }
}