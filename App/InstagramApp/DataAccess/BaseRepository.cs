using Microsoft.EntityFrameworkCore;
using InstagramApp.DataAccess.Context;
using InstagramApp.DataAccess.Interfaces;
using InstagramApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InstagramApp.DataAccess
{
    public class BaseRepository<T> : IRepository<T> where T : BaseModifiableModel
    {
        //protected ILog _log;

        public const int DEFAULT_BATCH_SIZE = 100;

        protected readonly ApplicationContext _context;
        protected readonly DbSet<T> _entitySet;

        public BaseRepository(ApplicationContext context)
        {
            _context = context;
            _entitySet = _context.Set<T>();
        }

        public virtual void SaveOrUpdate(T model)
        {
            if (model.Id == Guid.Empty)
            {
                model.Id = Guid.NewGuid();
                _entitySet.Add(model);
            }

            _context.SaveChanges();
        }

        public virtual async Task SaveOrUpdateAsync(T model)
        {
            if (model.Id == Guid.Empty)
            {
                model.Id = Guid.NewGuid();
                _entitySet.Add(model);
            }

            await _context.SaveChangesAsync();
        }

        public virtual void SaveItemList(IList<T> items)
        {
            if (items == null || !items.Any())
                return;
            
            foreach (T item in items)
            {
                if (item.Id == Guid.Empty)
                    _entitySet.Add(item);
            }

            _context.SaveChanges();
        }

        public virtual async Task SaveItemListAsync(IList<T> items)
        {
            if (items == null || !items.Any())
                return;

            foreach (T item in items)
            {
                if (item.Id == Guid.Empty)
                    _entitySet.Add(item);
            }

            await _context.SaveChangesAsync();
        }

        public virtual T GetById(Guid id)
        {
            return _entitySet.SingleOrDefault(x => x.Id == id);
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            return await _entitySet.SingleOrDefaultAsync(x => x.Id == id);
        }

        public virtual IList<T> GetListByIds(IList<Guid> ids)
        {
            return _entitySet.Where(x => ids.Contains(x.Id)).AsNoTracking().ToList();
        }

        public virtual async Task<IList<T>> GetListByIdsAsync(IList<Guid> ids)
        {
            return await _entitySet.Where(x => ids.Contains(x.Id)).AsNoTracking().ToListAsync();
        }

        public virtual IList<T> GetList()
        {
            return _entitySet.AsNoTracking().ToList();
        }

        public virtual async Task<IList<T>> GetListAsync()
        {
            return await _entitySet.AsNoTracking().ToListAsync();
        }

        public virtual IList<T> GetList(string sortColumn, bool sortAscending)
        {
            var tableName = typeof(T).Name;
            var orderDirection = sortAscending ? "ASC" : "DESC";

            String queryString = $"select * from {tableName} item order by item.{sortColumn} {orderDirection}";

            return _entitySet.FromSql(queryString).AsNoTracking().ToList();
        }

        public virtual async Task<IList<T>> GetListAsync(string sortColumn, bool sortAscending)
        {
            var tableName = typeof(T).Name;
            var orderDirection = sortAscending ? "ASC" : "DESC";

            String queryString = $"select * from {tableName} item order by item.{sortColumn} {orderDirection}";

            return await _entitySet.FromSql(queryString).AsNoTracking().ToListAsync();
        }

        public virtual Page<T> GetPage(int pageSize, int pageNumber)
        {
            var count = _entitySet.Count();

            var items = _entitySet.Skip(pageSize * (pageNumber - 1)).Take(pageSize).AsNoTracking().ToList();

            return new Page<T>
            {
                Items = items,
                TotalItems = count,
                CurrentPageSize = items.Count,
                CurrentPageNumber = pageNumber
            };
        }

        public virtual async Task<Page<T>> GetPageAsync(int pageSize, int pageNumber)
        {
            var countTask = _entitySet.CountAsync();
            var itemsTask = _entitySet.Skip(pageSize * (pageNumber - 1)).Take(pageSize).AsNoTracking().ToListAsync();
            await Task.WhenAll(countTask, itemsTask).ConfigureAwait(false);

            var count = countTask.Result;
            var items = itemsTask.Result;

            return new Page<T>
            {
                Items = items,
                TotalItems = count,
                CurrentPageSize = items.Count,
                CurrentPageNumber = pageNumber
            };
        }

        public virtual void Delete(T model)
        {
            _entitySet.Remove(model);
            _context.SaveChanges();
        }

        public virtual async Task DeleteAsync(T model)
        {
            _entitySet.Remove(model);
            await _context.SaveChangesAsync();
        }

        public virtual void DeleteById(Guid id)
        {
            var model = GetById(id);
            Delete(model);
        }

        public virtual async Task DeleteByIdAsync(Guid id)
        {
            var model = await GetByIdAsync(id);
            await DeleteAsync(model);
        }

        public virtual void DeleteMany(IEnumerable<T> items, int batchSize = DEFAULT_BATCH_SIZE)
        {
            int i = 0;

            foreach (var item in items)
            {
                i++;
                _entitySet.Remove(item);
                if (i % batchSize == 0)
                    _context.SaveChanges();
            }
        }

        public virtual async Task DeleteManyAsync(IEnumerable<T> items, int batchSize = DEFAULT_BATCH_SIZE)
        {
            int i = 0;

            foreach (var item in items)
            {
                i++;
                _entitySet.Remove(item);
                if (i % batchSize == 0)
                    await _context.SaveChangesAsync();
            }
        }

        public virtual void DeleteManyByIds(IList<Guid> itemIds, int batchSize)
        {
            var items = GetListByIds(itemIds);
            DeleteMany(items, batchSize);
        }

        public virtual async Task DeleteManyByIdsAsync(IList<Guid> itemIds, int batchSize)
        {
            var items = await GetListByIdsAsync(itemIds);
            await DeleteManyAsync(items, batchSize);
        }

        public virtual void Refresh(T entity)
        {
            _context.Entry(entity).Reload();
        }

        public virtual async Task RefreshAsync(T entity)
        {
            await _context.Entry(entity).ReloadAsync();
        }
    }
}
