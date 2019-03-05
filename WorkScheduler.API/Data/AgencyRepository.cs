using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class AgencyRepository : RepositoryBase<Agency>, IAgencyRpository
    {
        public AgencyRepository(DataContext dataContext) : base(dataContext) { }
        
        public async Task<List<Agency>> getAllAgencies()
        {
            return await FindAll().ToListAsync();
        }
    }
}