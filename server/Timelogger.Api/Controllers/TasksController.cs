using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Timelogger.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

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


        [HttpPost]
        public IActionResult CreateTask(Task task)
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

            _context.Tasks.Add(task);
            _context.SaveChanges();

            return Ok(task);
        }

        [HttpGet("{projectId}")]
        public IActionResult GetTasks(int projectId)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim.Value);
            var project = _context.Projects.Find(projectId);

            if (project == null || project.FreelancerId != userId)
            {
                return NotFound();
            }

            var tasks = _context.Tasks.Where(t => t.ProjectId == projectId);
            return Ok(tasks);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, Task updatedTask)
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

            task.Title = updatedTask.Title;
            task.TimeSpent = updatedTask.TimeSpent;

            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
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

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
