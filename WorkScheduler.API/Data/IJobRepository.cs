using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public interface IJobRepository : IRepositoryBase<Job>
    {
        Task<List<Job>> GetJobs();
        Task<Job> GetJob(int id);
        Task<List<Job>> GetJobsByWeek(DateTime start);
        Task<List<Job>> SearchAllJobs(string query);
    
    }
}