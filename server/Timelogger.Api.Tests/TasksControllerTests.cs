using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Timelogger.Api.Controllers;
using Timelogger.Api.Data;
using Timelogger;
using Timelogger.Dto;
using Timelogger.Entities;
using Timelogger.Enums;

[TestFixture]
public class TasksControllerTests
{
    private ApiContext _context;
    private TasksController _controller;

    [SetUp]
    public void SetUp()
    {
        var options = new DbContextOptionsBuilder<ApiContext>()
            .UseInMemoryDatabase(databaseName: "TasksTestDatabase")
            .Options;

        _context = new ApiContext(options);
        _controller = new TasksController(_context);

        DbInitializer.Initialize(_context);
    }

    private void SetUserClaims(string userId, string role)
    {
        var claims = new List<Claim>();

        if (!string.IsNullOrEmpty(userId))
        {
            claims.Add(new Claim("Id", userId));
        }

        if (!string.IsNullOrEmpty(role))
        {
            claims.Add(new Claim("Role", role));
        }

        var identity = new ClaimsIdentity(claims, "mock");
        var user = new ClaimsPrincipal(identity);

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = user }
        };
    }

    [Test]
    public void GetTasks_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var result = _controller.GetTasks(1);

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void GetTasks_AuthorizedUser_ReturnsPagedResults()
    {
        SetUserClaims("1", Role.Freelancer.ToString());

        var result = _controller.GetTasks(1);
        Assert.That(result, Is.TypeOf(typeof(OkObjectResult)));

        var okResult = (OkObjectResult)result;
        Assert.That(okResult.Value, Is.TypeOf(typeof(PagedResultDTO<TaskDTO>)));

        var pagedResult = (PagedResultDTO<TaskDTO>)okResult.Value;

        Assert.That(pagedResult.Items.Count, Is.EqualTo(10));
        Assert.That(pagedResult.Items[0].Id, Is.EqualTo(1));
    }

    [Test]
    public void GetTask_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var result = _controller.GetTask(1);

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void GetTask_AuthorizedUser_ReturnsTasks()
    {
        SetUserClaims("1", Role.Freelancer.ToString());

        var result = _controller.GetTask(1);
        Assert.That(result, Is.TypeOf(typeof(OkObjectResult)));

        var okResult = (OkObjectResult)result;
        Assert.That(okResult.Value, Is.TypeOf(typeof(TaskDTO)));

        var taskResult = (TaskDTO)okResult.Value;

        Assert.That(taskResult.Id, Is.EqualTo(1));
        Assert.That(taskResult.Title, Is.EqualTo("Requirement Analysis"));
        Assert.That(taskResult.ProjectId, Is.EqualTo(1));
        Assert.That(taskResult.TimeSpent, Is.EqualTo(7200000));
    }


    [Test]
    public void CreateTask_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var newTask = new Task { };

        var result = _controller.CreateTask(newTask);

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void CreateTask_AuthorizedUser()
    {
        SetUserClaims("1", Role.Freelancer.ToString());

        var newTask = new Task
        {
            Title = "Creation Task",
            TimeSpent = 0,
            TaskTypeId = 1,
            TaskCategoryId = 1,
            ProjectId = 1
        };

        var result = _controller.CreateTask(newTask);
        Assert.That(result, Is.TypeOf(typeof(OkResult)));

        var resultTasks = _controller.GetTasks(1);
        var okResultTasks = (OkObjectResult)resultTasks;
        var pagedResultTasks = (PagedResultDTO<TaskDTO>)okResultTasks.Value;

        Assert.That(pagedResultTasks.TotalItems, Is.EqualTo(13));
    }

    [Test]
    public void UpdateTask_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var changedTask = new Task { };
        var result = _controller.UpdateTask(1, changedTask);

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void UpdateTask_AuthorizedUser_NonOwnerProject_ReturnsNotFound()
    {
        SetUserClaims("2", Role.Freelancer.ToString());

        var changedTask = new Task { };
        var result = _controller.UpdateTask(1, changedTask);

        Assert.That(result, Is.TypeOf(typeof(NotFoundResult)));
    }

    [Test]
    public void UpdateTask_AuthorizedUser()
    {
        SetUserClaims("1", Role.Freelancer.ToString());

        var changedTask = new Task
        {
            Title = "Task Updated",
            TimeSpent = 2000,
            TaskTypeId = 2,
            TaskCategoryId = 3,
        };

        var result = _controller.UpdateTask(1, changedTask);
        Assert.That(result, Is.TypeOf(typeof(OkResult)));



    }

    [Test]
    public void DeleteTask_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var result = _controller.DeleteTask(1);

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void DeleteTask_AuthorizedUser_NonOwnerProject_ReturnsNotFound()
    {
        SetUserClaims("2", Role.Freelancer.ToString());
        var result = _controller.DeleteTask(1);

        Assert.That(result, Is.TypeOf(typeof(NotFoundResult)));
    }

    [Test]
    public void DeleteTask_AuthorizedUser_ReturnsNotContent()
    {
        SetUserClaims("1", Role.Freelancer.ToString());
        var result = _controller.DeleteTask(13);

        Assert.That(result, Is.TypeOf(typeof(NoContentResult)));
    }

}