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

		[Authorize(Policy = "RequireFreelancerOrCustomer")]
		[HttpGet]
		public ActionResult GetProjects(
			string sortBy = "Id",
			string sortDirection = "asc",
			int limit = 10,
			int page = 1
			)
		{
			var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
			var userRoleClaim = User.Claims.FirstOrDefault(c => c.Type == "Role");

			if (userIdClaim == null || userRoleClaim == null)
			{
				return Unauthorized();
			}

			var userId = int.Parse(userIdClaim.Value);

			IQueryable<Project> queryProjects = null;

			if (userRoleClaim.Value == Role.Freelancer.ToString())
			{
				queryProjects = _context.Projects.Where(p => p.FreelancerId == userId).OrderBy(p => p.Id);
			}
			else if (userRoleClaim.Value == Role.Customer.ToString())
			{
				queryProjects = _context.Projects.Where(p => p.CustomerId == userId).OrderBy(p => p.Id);
			}
			else
			{
				return Ok(new PagedResultDTO<ProjectDTO>
				{
					Items = [],
					PageNumber = 0,
					PageSize = 0,
					TotalPages = 0,
					TotalItems = 0,
					Columns = []
				});
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
				Items = UpdateProjectsWithTimeSpentAndCustomer(projects),
				PageNumber = page,
				PageSize = limit,
				TotalPages = totalPages,
				TotalItems = totalItems,
				Columns = GetProjectsColumns()
			});
		}

		[Authorize(Policy = "RequireFreelancerOrCustomer")]
		[HttpGet("{id}")]
		public ActionResult GetProject(int id)
		{
			var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
			var userRoleClaim = User.Claims.FirstOrDefault(c => c.Type == "Role");

			if (userIdClaim == null || userRoleClaim == null)
			{
				return Unauthorized();
			}
			var userId = int.Parse(userIdClaim.Value);

			IQueryable<Project> queryProject = null;

			if (userRoleClaim.Value == Role.Freelancer.ToString())
			{
				queryProject = _context.Projects.Where(p => p.Id == id && p.FreelancerId == userId);
			}
			else if (userRoleClaim.Value == Role.Customer.ToString())
			{
				queryProject = _context.Projects.Where(p => p.Id == id && p.CustomerId == userId);
			}
			else
			{
				return NotFound();
			}

			var project = queryProject.First();

			return Ok(new ProjectDTO(project)
			{
				TotalTimeSpent = GetTotalTimeSpent(project)
			});
		}

		[Authorize(Policy = "FreelancerOnly")]
		[HttpPost]
		public ActionResult CreateProject(Project project)
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

		[Authorize(Policy = "FreelancerOnly")]
		[HttpPut("{id}")]
		public ActionResult UpdateProject(int id, Project updatedProject)
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

			if (updatedProject.Status == Status.Done)
			{
				var onGoingTasks = _context.Tasks
					.Where(t => t.ProjectId == project.Id && t.Status != Status.Done && t.Status != Status.Canceled).ToList();

				if (onGoingTasks.Count() > 0)
				{
					return BadRequest("The Project can't be complete until all tasks have been finished or canceled.");
				}

			}

			project.Name = updatedProject.Name;
			project.CustomerId = updatedProject.CustomerId;
			project.Deadline = updatedProject.Deadline;
			project.Status = updatedProject.Status;

			_context.Entry(project).State = EntityState.Modified;
			_context.SaveChanges();

			return Ok(project);
		}

		[Authorize(Policy = "FreelancerOnly")]
		[HttpDelete("{id}")]
		public ActionResult DeleteProject(int id)
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

		private List<ProjectDTO> UpdateProjectsWithTimeSpentAndCustomer(List<Project> projects)
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
					TotalTimeSpent = GetTotalTimeSpent(project),
					Customer = GetCustomerName(project.CustomerId)
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

		private List<PagedColumnsDTO> GetProjectsColumns()
		{
			return [
				new PagedColumnsDTO {
					Id = "name",
					Header = "Name",
					HasSort = true
				},
				new PagedColumnsDTO {
					Id = "deadline",
					Header = "Deadline",
					HasSort = true
				},
				new PagedColumnsDTO {
					Id = "totalTimeSpent",
					Header = "TotalTimeSpent",
					HasSort = false
				},
				new PagedColumnsDTO {
					Id = "customer",
					Header = "Customer",
					HasSort = false
				},

			];
		}

		private string GetCustomerName(int customerId)
		{
			var user = _context.Users.Find(customerId);
			return user.Name;
		}
	}
}
