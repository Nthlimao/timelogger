using System.Collections.Generic;
using Timelogger.Entities;
using Timelogger.Enums;

namespace Timelogger.Api.Data.Seeds
{
    public static class TaskSeed
    {
        public static List<Task> Create()
        {
            return
            [
                new Task
                {
                    Title = "Requirement Analysis",
                    TimeSpent = 7200000,
                    TaskTypeId = 1,
                    TaskCategoryId = 1,
                    ProjectId = 1,
                    UserId = 1
                },
                new Task
                {
                    Title = "User Interface Design",
                    TimeSpent = 10800000,
                    TaskTypeId = 2,
                    TaskCategoryId = 2,
                    ProjectId = 1,
                    UserId = 1

                },
                new Task
                {
                    Title = "Project Planning",
                    TimeSpent = 5400000,
                    TaskTypeId = 2,
                    TaskCategoryId = 3,
                    ProjectId = 1,
                    UserId = 1
                },
                new Task
                {
                    Title = "Feature Development",
                    TimeSpent = 14400000,
                    TaskTypeId = 3,
                    TaskCategoryId = 4,
                    ProjectId = 1,
                    UserId = 1
                },
                new Task
                {
                    Title = "Bug Fixing",
                    TimeSpent = 3600000,
                    TaskTypeId = 4,
                    TaskCategoryId = 5,
                    ProjectId = 1,
                    UserId = 1
                },
                new Task
                {
                    Title = "Code Review",
                    TimeSpent = 1800000,
                    TaskTypeId = 2,
                    TaskCategoryId = 5,
                    ProjectId = 1,
                    UserId = 1
                },
                new Task
                {
                    Title = "Unit Testing",
                    TimeSpent = 9000000,
                    TaskTypeId = 4,
                    TaskCategoryId = 5,
                    ProjectId = 1,
                    UserId = 1
                },
                new Task
                {
                    Title = "Deployment Setup",
                    TimeSpent = 7200000,
                    TaskTypeId = 3,
                    TaskCategoryId = 6,
                    ProjectId = 1,
                    UserId = 1
                },
                new Task
                {
                    Title = "Server Maintenance",
                    TimeSpent = 3600000,
                    TaskTypeId = 2,
                    TaskCategoryId = 7,
                    ProjectId = 1,
                    UserId = 1
                },
                new Task
                {
                    Title = "Requirement Gathering",
                    TimeSpent = 10800000,
                    TaskTypeId = 1,
                    TaskCategoryId = 1,
                    ProjectId = 1,
                    UserId = 1
                },
                new Task
                {
                    Title = "Prototyping",
                    TimeSpent = 5400000,
                    TaskTypeId = 2,
                    TaskCategoryId = 2,
                    ProjectId = 1,
                    UserId = 1
                },
                new Task
                {
                    Title = "End-to-End Testing",
                    TimeSpent = 14400000,
                    TaskTypeId = 4,
                    TaskCategoryId = 5,
                    ProjectId = 1,
                    UserId = 1
                }
            ];
        }

        public static List<TaskCategory> CreateCategories()
        {
            return
            [
                new TaskCategory { Name = "Requirements", },
                new TaskCategory { Name = "Design", },
                new TaskCategory { Name = "Planning", },
                new TaskCategory { Name = "Implementation", },
                new TaskCategory { Name = "Testing", },
                new TaskCategory { Name = "Deployment", },
                new TaskCategory { Name = "Maintenance", },
            ];
        }

        public static List<TaskType> CreateTypes()
        {
            return
            [
                new TaskType { Name = "Story", Icon = "user" },
                new TaskType { Name = "Task", Icon = "user" },
                new TaskType { Name = "Feature", Icon = "user" },
                new TaskType { Name = "Issue", Icon = "user" }
            ];
        }
    }
}
