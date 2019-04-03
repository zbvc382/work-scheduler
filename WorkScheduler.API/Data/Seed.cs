using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using WorkScheduler.API.Models;

namespace WorkScheduler.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;

        public Seed(UserManager<User> userManager)
        {
            _userManager = userManager;

        }

        public void Initialise() {
            if (!_userManager.Users.Any())
            {
                var user = new User { UserName = "Paragon" };
                var password = "pAssword1!";

                _userManager.CreateAsync(user, password);
            }
        }
    }
}