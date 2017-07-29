using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using InstagramApp.Models;
using InstagramApp.DataAccess.Context;

namespace InstagramApp.Controllers
{
    //[Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly ApplicationContext _context;

        public SampleDataController(ApplicationContext context)
        {
            _context = context;
        }

        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        //[HttpGet("[action]")]
        //[Authorize]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            //var user = new User
            //{
            //    Id = Guid.NewGuid(),
            //    FirstName = "Vasya",
            //    LastName = "Pupkin",
            //    Username = "vpupkin",
            //    Created = DateTime.Now
            //};

            //user.SetNewPassword("123");

            //_context.Users.Add(user);
            //_context.SaveChanges();



            var users = _context.Users.ToList();
            var user = users.First();
            user.ModifiedDateTime = user.CreatedDateTime;
            _context.SaveChanges();


            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
