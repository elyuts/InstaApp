using System.Collections.Generic;

namespace InstagramApp.Models
{
    public class Project : BaseModifiableModel
    {
        public virtual string Title { get; set; }
        public virtual string Description { get; set; }
        public virtual decimal FundNeeded { get; set; }
        public virtual decimal FundGathered { get; set; }
        public virtual decimal RecomendedPayment { get; set; }
        public virtual ProjectState State { get; set; }
        public virtual bool IsImplemented { get; set; }
        public virtual bool IsPrivate { get; set; }

        //public virtual List<string> Images { get; set; }
        //public virtual List<string> Videos { get; set; }
        //public virtual List<ProjectLike> Likes { get; set; }
    }

    public enum ProjectState
    {
        Edit = 0,
        New = 1,
        Active = 2,
        Finished = 3
    }

    public class ProjectLike : BaseModifiableModel
    {
        public virtual Project Project { get; set; }
        public virtual bool IsLike { get; set; }    //like or dislike
    }

    public class Payment : BaseModifiableModel
    {
        public virtual decimal Value { get; set; }
        //public virtual int Number { get; set; }
        public virtual Project Project { get; set; }
        //public virtual PaymentState State { get; set; }
    }
}
