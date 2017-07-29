using InstagramApp.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InstagramApp.DataAccess.Interfaces
{
    public interface IRepository<T> where T : BaseModifiableModel
    {
        void SaveOrUpdate(T model);

        Task SaveOrUpdateAsync(T model);

        void SaveItemList(IList<T> items);

        Task SaveItemListAsync(IList<T> items);

        T GetById(Guid id);

        Task<T> GetByIdAsync(Guid id);

        IList<T> GetListByIds(IList<Guid> ids);

        Task<IList<T>> GetListByIdsAsync(IList<Guid> ids);

        IList<T> GetList();

        Task<IList<T>> GetListAsync();

        IList<T> GetList(string sortColumn, bool sortAscending);

        Task<IList<T>> GetListAsync(string sortColumn, bool sortAscending);

        Task<Page<T>> GetPageAsync(int pageSize, int pageNumber);

        void DeleteById(Guid id);

        Task DeleteByIdAsync(Guid id);

        void DeleteManyByIds(IList<Guid> itemIds, int batchSize);

        Task DeleteManyByIdsAsync(IList<Guid> itemIds, int batchSize);

        void DeleteMany(IEnumerable<T> items, int batchSize);

        Task DeleteManyAsync(IEnumerable<T> items, int batchSize);

        void Refresh(T entity);

        Task RefreshAsync(T entity);
    }
}
