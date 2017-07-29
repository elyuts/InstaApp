using InstagramApp.DataAccess.Context;
using InstagramApp.DataAccess.Interfaces;
using InstagramApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InstagramApp.DataAccess
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationContext context) : base(context)
        {
        }

        public User GetUserByEmail(string email)
        {
            return _entitySet.SingleOrDefault(x => x.Email == email.ToLower().Trim());
        }
    }
}
