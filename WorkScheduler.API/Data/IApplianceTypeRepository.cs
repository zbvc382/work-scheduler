using System.Collections.Generic;
using System.Threading.Tasks;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public interface IApplianceTypeRepository : IRepositoryBase<ApplianceType>
    {
         Task<List<ApplianceType>> GetApplianceTypes();
    }
}