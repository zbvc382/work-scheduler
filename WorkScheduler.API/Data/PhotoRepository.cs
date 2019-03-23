using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class PhotoRepository : RepositoryBase<Photo>, IPhotoRepository
    {
        public PhotoRepository(DataContext dataContext) : base(dataContext) { }

        public async Task<Photo> GetPhoto(int id) {
            var photo = await DataContext.Photos.FirstOrDefaultAsync();

            return photo;
        }

        public async Task<List<Photo>> GetPhotos(int jobId) {
            var photos = await FindByCondition(x => x.JobId == jobId).ToListAsync();

            return photos;
        }
    }
}