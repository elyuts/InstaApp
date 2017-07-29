using System;

namespace InstagramApp.Models
{
    public abstract class BaseModifiableModel : BaseModel
    {
        public virtual Guid ModifiedById { get; set; }
        public virtual DateTime ModifiedDateTime { get; set; }

        protected BaseModifiableModel()
        {
            ModifiedDateTime = CreatedDateTime = DateTime.UtcNow;
        }
    }
}
