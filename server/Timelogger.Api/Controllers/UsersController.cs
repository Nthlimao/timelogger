using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Timelogger.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly ApiContext _context;

        public UsersController(ApiContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route("hello-users")]
        public string HelloUsers()
        {
            return "Hello User!";
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Users);
        }
    }
}
