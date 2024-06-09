namespace Timelogger.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int TimeSpent { get; set; }
        public int ProjectId { get; set; }
        public int? TaskTypeId { get; set; }
        public int? TaskCategoryId { get; set; }
    }
}
