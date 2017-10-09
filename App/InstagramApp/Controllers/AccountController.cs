using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InstagramApp.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using InstagramApp.DataAccess.Interfaces;
using System.Net.Http;
using System.Text;
using System.IO;

namespace InstagramApp.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserRepository _userRepository;

        public AccountController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult> PostLogin(string code)
        {
            var jsonObj = new
            {
                client_id = "5d4a37f3ca7f4b0199bf25fe2cedfb69",
                client_secret = "8fe221e68f6146ee865881065366d998 ",
                grant_type = "authorization_code",
                redirect_uri = "https://localhost:44384/account/postlogin",
                code = code
            };
            var jsonInString = JsonConvert.SerializeObject(jsonObj);
            var stringContent = new StringContent(jsonInString, Encoding.UTF8, "application/json");

            var client = new HttpClient();
            var response = await client.PostAsync("https://api.instagram.com/oauth/access_token", stringContent);

            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public async Task<ActionResult> AcceptToken(string access_token)
        {

            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public ActionResult LoginInstagram()
        {

            return Redirect("https://www.instagram.com/oauth/authorize/?client_id=5d4a37f3ca7f4b0199bf25fe2cedfb69&redirect_uri=https://localhost:44384/home&response_type=token");
        }



        [HttpPost("/createnewuser")]
        public async Task CreateNewUser()
        {

        }

        [HttpPost("/token")]
        public async Task Token()
        {
            var username = Request.Form["username"];
            var password = Request.Form["password"];

            var identity = GetIdentity(username, password);

            if (identity == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;

            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            // сериализация ответа
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            User User = _userRepository.GetUserByEmail(username);

            if (User != null && User.CheckPassword(password))
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, User.Email)
                };

                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
    }
}
