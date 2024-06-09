using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Timelogger.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TaskCategoriesController : Controller
    {
        private readonly ApiContext _context;

        public TaskCategoriesController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult GetTaskCategories()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var categories = _context.TaskCategories.ToList();

            return Ok(categories);
        }
    }
}