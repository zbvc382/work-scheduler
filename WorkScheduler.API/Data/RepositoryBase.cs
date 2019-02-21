using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace WorkScheduler.API.Data
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected DataContext DataContext;

        public RepositoryBase(DataContext dataContext)
        {
            this.DataContext = dataContext;

        }
        public void Create(T entity)
        {
            this.DataContext.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            this.DataContext.Set<T>().Remove(entity);
        }

        public IEnumerable<T> FindAll()
        {
            return this.DataContext.Set<T>();
        }

        public IEnumerable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this.DataContext.Set<T>().Where(expression);
        }

        public void Save()
        {
            this.DataContext.SaveChanges();
        }

        public void Update(T entity)
        {
            this.DataContext.Set<T>().Update(entity);
        }
    }
}