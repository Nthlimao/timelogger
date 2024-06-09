using System;

namespace Timelogger.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? Deadline { get; set; }
        public int FreelancerId { get; set; }
        public int CustomerId { get; set; }
    }
}
