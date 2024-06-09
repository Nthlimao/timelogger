using System;
using System.Linq;
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
    public class TasksController : Controller
    {
        private readonly ApiContext _context;

        public TasksController(ApiContext context)
        {
            _context = context;
        }

        [Authorize(Policy = "FreelancerOnly")]
        [HttpPost]
        public ActionResult CreateTask(Task task)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim.Value);
            var project = _context.Projects.Find(task.ProjectId);

            if (project == null || project.FreelancerId != userId)
            {
                return NotFound();
            }

            task.UserId = userId;

            _context.Tasks.Add(task);
            _context.SaveChanges();

            return Ok(task);
        }

        [Authorize(Policy = "RequireFreelancerOrCustomer")]
        [HttpGet("{projectId}/all")]
        public ActionResult GetTasks(
            int projectId,
            string filterBy = null,
            int filterId = 0,
            string sortBy = "Id",
            string sortDirection = "asc",
            int limit = 10,
            int page = 1
        )
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim.Value);
            var project = _context.Projects.Find(projectId);

            if (project == null)
            {
                return NotFound();
            }

            var userRoleClaim = User.Claims.FirstOrDefault(c => c.Type == "Role");

            if (
                (userRoleClaim.Value == Role.Freelancer.ToString() && project.FreelancerId != userId) ||
                (userRoleClaim.Value == Role.Customer.ToString() && project.CustomerId != userId)
            )
            {
                return Unauthorized();
            }

            IQueryable<Task> queryTasks = null;
            queryTasks = _context.Tasks.Where(t => t.ProjectId == projectId);

            if (filterBy != null && filterId > 0)
            {
                queryTasks = FilterTasks(queryTasks, filterBy, filterId);

                if (queryTasks.Count() == 0)
                {
                    return Ok(
                        new PagedResultDTO<Task>
                        {
                            Items = [],
                            PageNumber = 0,
                            PageSize = 0,
                            TotalPages = 0,
                            TotalItems = 0
                        }
                    );
                }
            }

            queryTasks = SortTasks(queryTasks, sortBy, sortDirection);

            limit = Math.Max(limit, 10);

            var totalItems = queryTasks.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)limit);

            page = Math.Max(page, 1);
            page = page > totalPages ? totalPages : page;

            var current = (page - 1) * limit;
            var remainingItens = totalItems - current;
            limit = remainingItens < limit ? remainingItens : limit;

            queryTasks = queryTasks.Skip(current).Take(limit);

            var tasks = queryTasks.ToList();

            return Ok(
                new PagedResultDTO<Task>
                {
                    Items = tasks,
                    PageNumber = page,
                    PageSize = limit,
                    TotalPages = totalPages,
                    TotalItems = totalItems
                }
            );
        }

        [Authorize(Policy = "RequireFreelancerOrCustomer")]
        [HttpGet("{id}")]
        public ActionResult GetTask(int id)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim.Value);
            var task = _context.Tasks.Find(id);

            if (task == null)
            {
                return NotFound();
            }

            var project = _context.Projects.Find(task.ProjectId);
            if (project == null || project.FreelancerId != userId)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [Authorize(Policy = "FreelancerOnly")]
        [HttpPut("{id}")]
        public ActionResult UpdateTask(int id, Task updatedTask)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim.Value);
            var task = _context.Tasks.Find(id);

            if (task == null || task.UserId != userId)
            {
                return NotFound();
            }

            var project = _context.Projects.Find(task.ProjectId);
            if (project == null || project.FreelancerId != userId)
            {
                return NotFound();
            }

            task.Title = updatedTask.Title;
            task.TimeSpent = updatedTask.TimeSpent;
            task.TaskCategoryId = updatedTask.TaskCategoryId;
            task.TaskTypeId = updatedTask.TaskTypeId;

            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(task);
        }

        [Authorize(Policy = "FreelancerOnly")]
        [HttpDelete("{id}")]
        public ActionResult DeleteTask(int id)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim.Value);
            var task = _context.Tasks.Find(id);

            if (task == null || task.UserId != userId)
            {
                return NotFound();
            }

            var project = _context.Projects.Find(task.ProjectId);
            if (project == null || project.FreelancerId != userId)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return NoContent();
        }

        private IQueryable<Task> FilterTasks(IQueryable<Task> query, string filterBy, int filterId)
        {
            switch (filterBy.ToLower())
            {
                case "category":
                    query = query.Where(p => p.TaskCategoryId == filterId);
                    break;
                case "type":
                    query = query.Where(p => p.TaskTypeId == filterId);
                    break;

                default:
                    break;
            }

            return query;
        }

        private IQueryable<Task> SortTasks(
            IQueryable<Task> query,
            string sortBy,
            string sortDirection
        )
        {
            bool byDescending = sortDirection.ToLower() == "desc";

            switch (sortBy.ToLower())
            {
                case "id":
                    query = byDescending
                        ? query.OrderByDescending(p => p.Id)
                        : query.OrderBy(p => p.Id);
                    break;

                case "title":
                    query = byDescending
                        ? query.OrderByDescending(p => p.Title)
                        : query.OrderBy(p => p.Title);
                    break;

                case "timespent":
                    query = byDescending
                        ? query.OrderBy(p => p.TimeSpent)
                        : query.OrderByDescending(p => p.TimeSpent);
                    break;

                default:
                    break;
            }

            return query;
        }
    }
}
