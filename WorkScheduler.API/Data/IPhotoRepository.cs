using System.Threading.Tasks;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public interface IPhotoRepository : IRepositoryBase<Photo>
    {
         Task<Photo> GetPhoto(int id);
    }
}