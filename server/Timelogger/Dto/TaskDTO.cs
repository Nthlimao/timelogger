using Timelogger.Entities;
using Timelogger.Enums;

namespace Timelogger.Dto
{
    public class TaskDTO
    {
        public TaskDTO(Task task)
        {
            Id = task.Id;
            Title = task.Title;
            TimeSpent = task.TimeSpent;
            ProjectId = task.ProjectId;
            UserId = task.UserId;
            Status = task.Status;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public int TimeSpent { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public TaskCategory Category { get; set; }
        public TaskType Type { get; set; }
        public Status Status { get; set; }
    }
}
