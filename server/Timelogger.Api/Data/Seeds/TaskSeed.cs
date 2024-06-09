using System.Collections.Generic;
using Timelogger.Entities;
using Timelogger.Enums;

namespace Timelogger.Api.Data.Seeds
{
    public static class TaskSeed
    {
        public static List<Task> Create()
        {
            return [];

        }
        public static List<TaskCategory> CreateCategories()
        {
            return [
                new TaskCategory
                {
                    Name = "Requirements",
                },
                new TaskCategory
                {
                    Name = "Design",
                },
                new TaskCategory
                {
                    Name = "Planning",
                },
                new TaskCategory
                {
                    Name = "Implementation",
                },
                new TaskCategory
                {
                    Name = "Testing",
                },
                new TaskCategory
                {
                    Name = "Deployment",
                },
                new TaskCategory
                {
                    Name = "Maintenance",
                },
            ];
        }
        public static List<TaskType> CreateTypes()
        {
            return [
                new TaskType
                {
                    Name = "Story",
                    Icon = "user"
                },
                new TaskType
                {
                    Name = "Task",
                    Icon = "user"
                },
                new TaskType
                {
                    Name = "Feature",
                    Icon = "user"
                },
                new TaskType
                {
                    Name = "Issue",
                    Icon = "user"
                }
            ];
        }
    }
}
