using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Timelogger.Enums;
using Timelogger.Entities;
using Microsoft.EntityFrameworkCore;
using Timelogger.Dto;

namespace Timelogger.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly ApiContext _context;

        public UsersController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("customers")]
        public ActionResult GetCustomers()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var customers = _context.Users.Where(p => p.Role == Role.Customer).ToList();

            return Ok(customers);
        }

        [HttpGet]
        [Route("details")]
        public ActionResult GetDetails()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim.Value);
            var user = _context.Users.Find(userId);

            return Ok(new
            {
                user.Name,
                user.Email,
                user.Role
            });
        }

        [HttpPut]
        public ActionResult UpdateDetails(User updatedUser)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var user = _context.Users.Find(userIdClaim);

            if (user == null)
            {
                return NotFound();
            }

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(updatedUser);
        }

        [HttpPut]
        [Route("change-password")]
        public ActionResult UpdatePassword(UpdatePasswordDTO formPassword)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim.Value);
            var user = _context.Users.Find(userId);

            if (user == null)
            {
                return NotFound();
            }

            if (user.Password != formPassword.OldPassword)
            {
                BadRequest("Old password incorrect. Please try again.");
            }

            user.Password = formPassword.NewPassword;

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok("Password Updated!");
        }
    }
}
