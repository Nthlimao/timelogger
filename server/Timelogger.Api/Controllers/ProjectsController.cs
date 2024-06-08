using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Timelogger.Enums;

namespace Timelogger.Api.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	public class ProjectsController : Controller
	{
		private readonly ApiContext _context;

		public ProjectsController(ApiContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("hello-world")]
		public string HelloWorld()
		{
			var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
			if (userIdClaim == null)
			{
				return "Unauthorized";
			}

			return userIdClaim.ToString();
		}

		// GET api/projects
		[HttpGet]
		public IActionResult Get()
		{
			var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");

			if (userIdClaim == null)
			{
				return Unauthorized();
			}

			var userRoleClaim = User.Claims.FirstOrDefault(c => c.Type == "Role");

			var id = int.Parse(userIdClaim.Value);

			if (userRoleClaim.Value == Role.Freelancer.ToString())
			{
				var freelancerProjects = _context.Projects.Where(p => p.FreelancerId == id);
				return Ok(freelancerProjects);
			}
			else if (userRoleClaim.Value == Role.Customer.ToString())
			{
				var customerProjects = _context.Projects.Where(p => p.CustomerId == id);
				return Ok(customerProjects);
			}


			return Ok();
		}
	}
}
