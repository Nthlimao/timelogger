using Timelogger.Api.Data.Seeds;

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
            var tasks = TaskSeed.Create();

            context.TaskCategories.AddRange(categories);
            context.TaskTypes.AddRange(types);
            context.Tasks.AddRange(tasks);

            // PROJECTS
            var projects = ProjectSeed.Create();
            context.Projects.AddRange(projects);

            context.SaveChanges();
        }


    }
}
