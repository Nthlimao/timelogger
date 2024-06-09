using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;

namespace Timelogger.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TaskTypesController : Controller
    {
        private readonly ApiContext _context;

        public TaskTypesController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult GetTaskTypes()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var types = _context.TaskTypes.ToList();

            return Ok(types);
        }
    }
}