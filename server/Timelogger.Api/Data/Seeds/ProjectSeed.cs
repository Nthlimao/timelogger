using System;
using System.Collections.Generic;
using Timelogger.Entities;
using Timelogger.Enums;

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
                    Name = "Website Development",
                    Deadline = new DateTime(2024, 07, 15),
                    FreelancerId = 1,
                    CustomerId = 3,
                    Status = Status.InProgress
                },
                new Project
                {
                    Name = "Mobile App Development",
                    Deadline = new DateTime(2024, 08, 31),
                    FreelancerId = 1,
                    CustomerId = 3,
                    Status = Status.Backlog
                },
                new Project
                {
                    Name = "Marketing Campaign",
                    Deadline = new DateTime(2024, 09, 30),
                    FreelancerId = 1,
                    CustomerId = 3,
                    Status = Status.Backlog
                },
                new Project
                {
                    Name = "Product Launch",
                    Deadline = new DateTime(2024, 10, 15),
                    FreelancerId = 1,
                    CustomerId = 3,
                    Status = Status.Backlog
                },
                new Project
                {
                    Name = "Software Maintenance",
                    Deadline = new DateTime(2024, 11, 30),
                    FreelancerId = 1,
                    CustomerId = 3,
                    Status = Status.Backlog
                },
                new Project
                {
                    Name = "Data Analysis",
                    Deadline = new DateTime(2024, 12, 20),
                    FreelancerId = 1,
                    CustomerId = 3,
                    Status = Status.Backlog
                },
                new Project
                {
                    Name = "Network Security Audit",
                    Deadline = new DateTime(2025, 01, 10),
                    FreelancerId = 1,
                    CustomerId = 3,
                    Status = Status.Backlog
                },
                new Project
                {
                    Name = "Business Process Improvement",
                    Deadline = new DateTime(2025, 02, 25),
                    FreelancerId = 1,
                    CustomerId = 3,
                    Status = Status.Backlog
                },
                new Project
                {
                    Name = "Customer Relationship Management (CRM) Implementation",
                    Deadline = new DateTime(2025, 03, 15),
                    FreelancerId = 1,
                    CustomerId = 4,
                    Status = Status.Backlog
                },
                new Project
                {
                    Name = "Training and Development Program",
                    Deadline = new DateTime(2025, 04, 30),
                    FreelancerId = 1,
                    CustomerId = 4,
                    Status = Status.Backlog
                },
                new Project
                {
                    Name = "Inventory Management System Upgrade",
                    Deadline = new DateTime(2025, 05, 20),
                    FreelancerId = 1,
                    CustomerId = 4,
                    Status = Status.Backlog
                },
                new Project
                {
                    Name = "Annual Financial Report Preparation",
                    Deadline = new DateTime(2025, 06, 30),
                    FreelancerId = 1,
                    CustomerId = 4,
                    Status = Status.Backlog
                }
            ];
        }
    }
}
