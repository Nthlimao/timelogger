using System.Text.Json.Serialization;

namespace Timelogger.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int TimeSpent { get; set; }
        public int ProjectId { get; set; }
    }
}
