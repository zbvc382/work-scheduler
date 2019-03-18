using System.Linq;
using System.Threading.Tasks;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class TagRepository : RepositoryBase<Tag>, ITagRepository
    {
        public TagRepository(DataContext dataContext) : base(dataContext) { }

        public Tag GetTag(int id) {
            var tag = this.FindAll().FirstOrDefault(x => x.Id == id);

            return tag;
        }
    }
}