using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class ApplianceTypeRepository : RepositoryBase<ApplianceType>, IApplianceTypeRepository
    {
        private readonly DataContext _dataContext;

        public ApplianceTypeRepository(DataContext dataContext) : base(dataContext) {
            _dataContext = dataContext;
        }
        public async Task<List<ApplianceType>> GetApplianceTypes()
        {
            var applianceTypes = await FindAll().ToListAsync();

            return applianceTypes;
        }
    }

}