using System;
using System.Collections.Generic;
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
        public ActionResult CreateTask([FromForm] Task task)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim.Value);
            var project = _context.Projects.Find(task.ProjectId);
            Console.WriteLine(project);
            Console.WriteLine(userId);

            if (project == null || project.FreelancerId != userId)
            {
                return NotFound("Projeto não encontrato ao não pertence ao usuário");
            }

            var projectStillOpen = project.Status != Status.Done && project.Status != Status.Canceled;

            if (!projectStillOpen)
            {
                return BadRequest("It is not allowed to add a new task to a finished project.");
            }

            task.UserId = userId;

            _context.Tasks.Add(task);
            _context.SaveChanges();

            return Ok();
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
                            TotalItems = 0,
                            Columns = []
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
                new PagedResultDTO<TaskDTO>
                {
                    Items = UpdateTasksWithCategoryAndType(tasks),
                    PageNumber = page,
                    PageSize = limit,
                    TotalPages = totalPages,
                    TotalItems = totalItems,
                    Columns = GetTasksColumns()
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
            if (project == null || project.FreelancerId != userId && project.CustomerId != userId)
            {
                return NotFound();
            }

            return Ok(new TaskDTO(task)
            {
                Category = GetTaskCategory(task.TaskCategoryId),
                Type = GetTaskType(task.TaskTypeId),
            });
        }

        [Authorize(Policy = "FreelancerOnly")]
        [HttpPut("{id}")]
        public ActionResult UpdateTask(int id, [FromForm] Task updatedTask)
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

            var projectStillOpen = project.Status != Status.Done && project.Status != Status.Canceled;
            var timeSpentChanged = updatedTask.TimeSpent != task.TimeSpent;
            var statusChanged = updatedTask.Status != task.Status;

            if (!projectStillOpen && timeSpentChanged)
            {
                return BadRequest("Task Time Spent can't be changed after the project is finished.");
            }

            if (!projectStillOpen && statusChanged)
            {
                return BadRequest("Task Status can't be changed after the project is finished.");
            }

            task.Title = updatedTask.Title;
            task.TimeSpent = updatedTask.TimeSpent;
            task.TaskCategoryId = updatedTask.TaskCategoryId;
            task.TaskTypeId = updatedTask.TaskTypeId;
            task.Status = updatedTask.Status;

            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok();
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
        private TaskCategory GetTaskCategory(int? id)
        {
            if (id == null)
            {
                return new TaskCategory { };
            }
            var category = _context.TaskCategories
                .Find(id);

            return category;
        }

        private TaskType GetTaskType(int? id)
        {
            if (id == null)
            {
                return new TaskType { };
            }
            var type = _context.TaskTypes
                .Find(id);

            return type;
        }

        private List<TaskDTO> UpdateTasksWithCategoryAndType(List<Task> tasks)
        {
            if (tasks == null || tasks.Count == 0)
            {
                return [];
            }

            var tasksDTOs = new List<TaskDTO>();

            foreach (Task task in tasks)
            {
                var taskDTO = new TaskDTO(task)
                {
                    Category = GetTaskCategory(task.TaskCategoryId),
                    Type = GetTaskType(task.TaskTypeId),

                };

                tasksDTOs.Add(taskDTO);

            }

            return tasksDTOs;
        }

        private List<PagedColumnsDTO> GetTasksColumns()
        {
            return [
                new PagedColumnsDTO {
                    Id = "title",
                    Header = "Title",
                    HasSort = true
                },
                new PagedColumnsDTO {
                    Id = "statusName",
                    Header = "Status",
                    HasSort = false
                },
                new PagedColumnsDTO {
                    Id = "categoryName",
                    Header = "Category",
                    HasSort = false
                },
                new PagedColumnsDTO {
                    Id = "typeName",
                    Header = "Type",
                    HasSort = false
                },
                new PagedColumnsDTO {
                    Id = "timeSpent",
                    Header = "TimeSpent",
                    HasSort = true
                },

            ];
        }
    }
}
