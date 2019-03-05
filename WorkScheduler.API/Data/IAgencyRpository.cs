using System.Collections.Generic;
using System.Threading.Tasks;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public interface IAgencyRpository : IRepositoryBase<Agency>
    {
         Task<List<Agency>> getAllAgencies();
    }
}