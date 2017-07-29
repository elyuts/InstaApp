using System.Collections;
using System.Collections.Generic;

namespace InstagramApp.Models
{
    public class Page<T> : IEnumerable<T>, IEnumerable
    {
        public int TotalItems { get; set; }

        public IList<T> Items { get; set; }

        public int CurrentPageSize { get; set; }

        public int CurrentPageNumber { get; set; }

        public Dictionary<string, object> AdditionalProperties { get; set; }

        public Page()
        {
            Items = new List<T>();
            AdditionalProperties = new Dictionary<string, object>();
            CurrentPageSize = 50;   // default
            CurrentPageNumber = 0;
        }

        public IEnumerator<T> GetEnumerator()
        {
            return Items.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
