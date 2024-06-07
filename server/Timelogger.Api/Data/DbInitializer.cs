using Timelogger.Entities;

namespace Timelogger.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApiContext context)
        {
            UserSeed(context);
            ProjectSeed(context);
        }

        public static void UserSeed(ApiContext context)
        {
            var users = new User[]
            {
                new User
                {
                    Name = "Freelancer Default",
                    Email = "free-default@email.com",
                    Password = "freelancer",
                    Role = "Freelancer"
                },
                new User
                {
                    Name = "Customer 001",
                    Email = "customer-001@email.com",
                    Password = "customer1",
                    Role = "Customer"
                },
                new User
                {
                    Name = "Customer 002",
                    Email = "customer-002@email.com",
                    Password = "customer2",
                    Role = "Customer"
                }
            };

            foreach (User user in users)
            {
                context.Users.Add(user);
            }

            context.SaveChanges();
        }

        public static void ProjectSeed(ApiContext context)
        {
            var projects = new Project[]
            {
                new Project
                {
                    Name = "Project 001",
                    FreelancerId = 1,
                    CustomerId = 2
                },
                new Project
                {
                    Name = "Project 002",
                    FreelancerId = 1,
                    CustomerId = 3
                },
            };

            foreach (Project project in projects)
            {
                context.Projects.Add(project);
            }

            context.SaveChanges();
        }
    }
}
