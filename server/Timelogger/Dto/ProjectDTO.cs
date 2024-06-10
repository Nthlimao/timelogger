using System;
using System.Collections.Generic;
using Timelogger.Entities;
using Timelogger.Enums;

namespace Timelogger.Dto
{
    public class ProjectDTO
    {

        public ProjectDTO(Project project)
        {
            Id = project.Id;
            Name = project.Name;
            FreelancerId = project.FreelancerId;
            CustomerId = project.CustomerId;
            Deadline = project.Deadline;
            CustomerId = project.CustomerId;
            Status = project.Status;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? Deadline { get; set; }
        public int FreelancerId { get; set; }
        public int CustomerId { get; set; }
        public int TotalTimeSpent { get; set; }
        public Status Status { get; set; }
        public List<Task> Tasks { get; set; }
    }
}
