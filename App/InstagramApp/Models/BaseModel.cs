using System;

namespace InstagramApp.Models
{
    public abstract class BaseModel
    {
        public virtual Guid Id { get; set; }
        public virtual Guid CreatedById { get; set; }
        public virtual DateTime CreatedDateTime { get; set; }

        protected BaseModel()
        {
            CreatedDateTime = DateTime.UtcNow;
        }
    }
}
