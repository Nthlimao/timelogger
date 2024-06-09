using Microsoft.Extensions.DependencyInjection;
using Timelogger.Api.Data.Seeds;
using Timelogger.Entities;

namespace Timelogger.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(IServiceScope scope)
        {
            var context = scope.ServiceProvider.GetService<ApiContext>();

            // USERS
            var users = UserSeed.Create();

            foreach (User user in users)
            {
                context.Users.Add(user);
            }

            // PROJECTS
            var projects = ProjectSeed.Create();

            foreach (Project project in projects)
            {
                context.Projects.Add(project);
            }

            context.SaveChanges();
        }

    }
}
