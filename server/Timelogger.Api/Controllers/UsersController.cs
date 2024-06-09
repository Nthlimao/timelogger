using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Timelogger.Enums;

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
        public ActionResult GetCustomers()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var users = _context.Users.Where(p => p.Role == Role.Customer).ToList();

            return Ok(users);
        }
    }
}
