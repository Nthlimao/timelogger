using System.Collections.Generic;
using Timelogger.Entities;

namespace Timelogger.Api.Data.Seeds
{
    public static class ProjectSeed
    {
        public static List<Project> Create()
        {
            return
            [
                new Project
                {
                    Name = "Project 001",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 3
                },
                new Project
                {
                    Name = "Project 002",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 4
                },
                new Project
                {
                    Name = "Project 003",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 3
                },
                new Project
                {
                    Name = "Project 004",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 4
                },
                new Project
                {
                    Name = "Project 005",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 3
                },
                new Project
                {
                    Name = "Project 006",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 4
                },
                new Project
                {
                    Name = "Project 007",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 3
                },
                new Project
                {
                    Name = "Project 008",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 4
                },
                new Project
                {
                    Name = "Project 009",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 3
                },
                new Project
                {
                    Name = "Project 010",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 4
                },
                new Project
                {
                    Name = "Project 011",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 3
                },
                new Project
                {
                    Name = "Project 012",
                    Deadline = null,
                    FreelancerId = 1,
                    CustomerId = 4
                },
            ];
        }
    }
}
