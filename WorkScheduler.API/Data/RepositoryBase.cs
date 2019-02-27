using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected DataContext DataContext;

        public RepositoryBase(DataContext dataContext)
        {
            this.DataContext = dataContext;

        }
        public async Task<T> Create(T entity)
        {
            await DataContext.Set<T>().AddAsync(entity);

            return entity;
        }

        public void Delete(T entity)
        {
            this.DataContext.Set<T>().Remove(entity);
        }

        public IQueryable<T> FindAll()
        {
            return this.DataContext.Set<T>().AsQueryable();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this.DataContext.Set<T>().Where(expression).AsQueryable();
        }

        public void Save()
        {
            this.DataContext.SaveChangesAsync();
        }

        public void Update(T entity)
        {
            this.DataContext.Set<T>().Update(entity);
        }
    }
}