using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Timelogger.Dto;
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
		public ActionResult<PagedResultDTO<ProjectDTO>> GetProjects(string sortBy = "Id",
			string sortDirection = "asc",
			int limit = 10, int page = 1)
		{
			var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");

			if (userIdClaim == null)
			{
				return Unauthorized();
			}

			var userRoleClaim = User.Claims.FirstOrDefault(c => c.Type == "Role");
			var userId = int.Parse(userIdClaim.Value);

			IQueryable<Project> queryProjects = null;

			if (userRoleClaim.Value == Role.Freelancer.ToString())
			{
				queryProjects = _context.Projects.Where(p => p.FreelancerId == userId).OrderBy(p => p.Id);
			}
			else if (userRoleClaim.Value == Role.Customer.ToString())
			{
				queryProjects = _context.Projects.Where(p => p.CustomerId == userId);
			}
			else
			{
				return Ok();
			}

			queryProjects = SortProjects(queryProjects, sortBy, sortDirection);

			limit = Math.Max(limit, 10);

			var totalItems = queryProjects.Count();
			var totalPages = (int)Math.Ceiling(totalItems / (double)limit);

			page = Math.Max(page, 1);
			page = page > totalPages ? totalPages : page;

			var current = (page - 1) * limit;
			var remainingItens = totalItems - current;
			limit = remainingItens < limit ? remainingItens : limit;

			queryProjects = queryProjects.Skip(current).Take(limit);

			var projects = queryProjects.ToList();

			return Ok(new PagedResultDTO<ProjectDTO>
			{
				Items = UpdateProjectsWithTimeSpent(projects),
				PageNumber = page,
				PageSize = limit,
				TotalPages = totalPages,
				TotalItems = totalItems
			});
		}

		[HttpGet("{id}")]
		public ActionResult<ProjectDTO> GetProject(int id)
		{
			var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");

			if (userIdClaim == null)
			{
				return Unauthorized();
			}

			var userRoleClaim = User.Claims.FirstOrDefault(c => c.Type == "Role");

			var project = _context.Projects.Find(id);
			var tasks = _context.Tasks.Where(t => t.ProjectId == project.Id).ToList();

			return Ok(new ProjectDTO(project)
			{
				Tasks = tasks,
				TotalTimeSpent = GetTotalTimeSpent(project)
			});
		}

		[HttpPost]
		public ActionResult<Project> CreateProject(Project project)
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
		public ActionResult<Project> UpdateProject(int id, Project updatedProject)
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
			project.Deadline = updatedProject.Deadline;

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

		private List<ProjectDTO> UpdateProjectsWithTimeSpent(List<Project> projects)
		{
			if (projects == null || projects.Count == 0)
			{
				return [];
			}

			var projectDTOs = new List<ProjectDTO>();

			foreach (Project project in projects)
			{
				var projectDTO = new ProjectDTO(project)
				{
					TotalTimeSpent = GetTotalTimeSpent(project)
				};

				projectDTOs.Add(projectDTO);

			}

			return projectDTOs;
		}

		private int GetTotalTimeSpent(Project project)
		{

			if (project == null)
			{
				return 0;
			};

			var sumTimeSpent = _context.Tasks
				.Where(t => t.ProjectId == project.Id)
				.Sum(t => t.TimeSpent);

			return sumTimeSpent;
		}

		private IQueryable<Project> SortProjects(IQueryable<Project> query, string sortBy, string sortDirection)
		{
			bool byDescending = sortDirection.ToLower() == "desc";

			switch (sortBy.ToLower())
			{
				case "id":
					query = byDescending ? query.OrderByDescending(p => p.Id) : query.OrderBy(p => p.Id);
					break;

				case "name":
					query = byDescending ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name);
					break;

				case "deadline":
					query = byDescending ? query.OrderBy(p => p.Deadline) : query.OrderByDescending(p => p.Deadline);
					break;

				default:
					break;
			}

			return query;
		}
	}
}
