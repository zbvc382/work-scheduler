using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace WorkScheduler.API.Data
{
    public interface IRepositoryBase<T>
    {
        IQueryable<T> FindAll();
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
        Task<T> CreateAsync(T entity);
        T Create(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Save();
        Task SaveAsync();
    }
}