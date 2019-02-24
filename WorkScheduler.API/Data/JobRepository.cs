using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class JobRepository : RepositoryBase<Job>, IJobRepository
    {
        public JobRepository(DataContext dataContext) : base(dataContext) {}

        public async Task<List<Job>> GetJobs()
        {
            return await FindAll().Include(Job => Job.Private).Include(Job => Job.Address).ToListAsync();
        }

        public async Task<Job> GetJob(int id)
        {
            return await FindAll()
                .Include(Job => Job.Landlord)
                .Include(Job => Job.Private)
                .Include(Job => Job.Tenant)
                .Include(Job => Job.Agency)
                .Include(Job => Job.Address)
                .FirstOrDefaultAsync(j => j.Id == id);
        }
    }
}