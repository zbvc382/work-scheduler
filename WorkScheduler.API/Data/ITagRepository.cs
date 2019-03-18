using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public interface ITagRepository : IRepositoryBase<Tag>
    {
        Tag GetTag(int id);
    }
}