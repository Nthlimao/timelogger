using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Timelogger.Entities;
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
		public IActionResult GetProjects()
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

		[HttpPost]
		public IActionResult CreateProject(Project project)
		{
			var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");

			if (userIdClaim == null)
			{
				return Unauthorized();
			}

			var userId = int.Parse(userIdClaim.Value);
			project.FreelancerId = userId;

			_context.Projects.Add(project);
			_context.SaveChanges();

			return Ok(project);
		}

		[HttpPut("{id}")]
		public IActionResult UpdateProject(int id, Project updatedProject)
		{
			var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
			if (userIdClaim == null)
			{
				return Unauthorized();
			}

			var userId = int.Parse(userIdClaim.Value);
			var project = _context.Projects.Find(id);

			if (project == null || project.FreelancerId != userId)
			{
				return NotFound();
			}

			project.Name = updatedProject.Name;
			project.CustomerId = updatedProject.CustomerId;

			_context.Entry(project).State = EntityState.Modified;
			_context.SaveChanges();

			return Ok(project);
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteProject(int id)
		{
			var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
			if (userIdClaim == null)
			{
				return Unauthorized();
			}

			var userId = int.Parse(userIdClaim.Value);
			var project = _context.Projects.Find(id);

			if (project == null || project.FreelancerId != userId)
			{
				return NotFound();
			}

			var tasks = _context.Tasks.Where(t => t.ProjectId == project.Id);

			foreach (Task task in tasks)
			{
				_context.Tasks.Remove(task);
			}

			_context.Projects.Remove(project);
			_context.SaveChanges();

			return NoContent();
		}

	}
}
