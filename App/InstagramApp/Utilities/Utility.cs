using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace InstagramApp.Utilities
{
    public static class Utility
    {
        public static string GenerateSalt()
        {
            var saltBytes = new byte[8];
            RandomNumberGenerator.Create().GetBytes(saltBytes);
            return Convert.ToBase64String(saltBytes);
        }

        public static string GetPasswordHash(string password, string salt)
        {
            return SaltAndHash(password, salt, GetSHA1Base64Hash);
        }

        public static string SaltAndHash(string text, string salt, Func<string, string> hashMethod)
        {
            return hashMethod(text + salt);
        }

        private static string GetSHA1Base64Hash(string input)
        {
            byte[] hashedBytes = UnicodeEncoding.Unicode.GetBytes(input);
            return Convert.ToBase64String(SHA1.Create().ComputeHash(hashedBytes));
        }


        public static TResult May<TNullable, TResult>(this TNullable? nullable, Func<TNullable, TResult> selector)
            where TNullable : struct
        {
            return nullable.HasValue ? selector(nullable.Value) : default(TResult);
        }

        public static TResult May<T, TResult>(this T value, Func<T, TResult> selector)
            where T : class
        {
            return value != null ? selector(value) : default(TResult);
        }

        public static TResult May<T, TResult>(this T value, Func<T, TResult> selector, TResult defaultValue)
           where T : class
        {
            if (value == null) return defaultValue;
            var result = selector(value);
            return result != null ? result : defaultValue;
        }
    }
}
