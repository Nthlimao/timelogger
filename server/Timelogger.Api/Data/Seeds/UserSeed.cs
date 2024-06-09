using System.Collections.Generic;
using Timelogger.Entities;
using Timelogger.Enums;

namespace Timelogger.Api.Data.Seeds
{
    public static class UserSeed
    {
        public static List<User> Create()
        {
            return [
                new User
                {
                    Name = "Freelancer 001",
                    Email = "free-001@email.com",
                    Password = "freelancer",
                    Role = Role.Freelancer
                },
                new User
                {
                    Name = "Freelancer 002",
                    Email = "free-002@email.com",
                    Password = "freelancer",
                    Role = Role.Freelancer
                },
                new User
                {
                    Name = "Customer 001",
                    Email = "customer-001@email.com",
                    Password = "customer1",
                    Role = Role.Customer
                },
                new User
                {
                    Name = "Customer 002",
                    Email = "customer-002@email.com",
                    Password = "customer2",
                    Role = Role.Customer
                }
            ];

        }
    }
}
