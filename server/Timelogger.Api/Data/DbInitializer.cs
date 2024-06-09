using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Timelogger.Api.Data.Seeds;
using Timelogger.Entities;

namespace Timelogger.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApiContext context)
        {

            // USERS
            var users = UserSeed.Create();
            context.Users.AddRange(users);

            // TASKS ELEMENTS
            var categories = TaskSeed.CreateCategories();
            var types = TaskSeed.CreateTypes();

            context.TaskCategories.AddRange(categories);
            context.TaskTypes.AddRange(types);
            // PROJECTS
            var projects = ProjectSeed.Create();
            context.Projects.AddRange(projects);

            context.SaveChanges();
        }


    }
}
