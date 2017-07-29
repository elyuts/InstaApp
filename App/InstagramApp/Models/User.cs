using InstagramApp.Utilities;
using System;

namespace InstagramApp.Models
{
    public class User : BaseModifiableModel
    {
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }

        public virtual string Email
        {
            get { return _email; }
            set { _email = value.ToLower().Trim(); }
        }

        private string _email;

        public virtual string PasswordSalt { get; set; }
        public virtual string HashedPassword { get; set; }


        public virtual bool CheckPassword(string password)
        {
            if (String.IsNullOrEmpty(password)) return false;

            return Utility.GetPasswordHash(password, PasswordSalt) == HashedPassword;
        }

        public virtual void SetNewPassword(string newPassword)
        {
            if (newPassword == null) throw new ArgumentNullException("newPassword");
            if (String.IsNullOrWhiteSpace(newPassword)) throw new ArgumentException("newPassword cannot be whitespace", "newPassword");

            string passwordSalt = Utility.GenerateSalt();
            string hashedPassword = Utility.GetPasswordHash(newPassword, passwordSalt);

            HashedPassword = hashedPassword;
            PasswordSalt = passwordSalt;
        }
    }
}
