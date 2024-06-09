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
public class ProjectsControllerTests
{
    private ApiContext _context;
    private ProjectsController _controller;

    [SetUp]
    public void SetUp()
    {
        var options = new DbContextOptionsBuilder<ApiContext>()
            .UseInMemoryDatabase(databaseName: "ProjectsTestDatabase")
            .Options;

        _context = new ApiContext(options);
        _controller = new ProjectsController(_context);

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
    public void GetProjects_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var result = _controller.GetProjects();

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void GetProjects_AuthorizedUser_ReturnsPagedResults()
    {
        SetUserClaims("1", Role.Freelancer.ToString());

        var result = _controller.GetProjects();
        Assert.That(result, Is.TypeOf(typeof(OkObjectResult)));

        var okResult = (OkObjectResult)result;
        Assert.That(okResult.Value, Is.TypeOf(typeof(PagedResultDTO<ProjectDTO>)));

        var pagedResult = (PagedResultDTO<ProjectDTO>)okResult.Value;

        Assert.That(pagedResult.Items.Count, Is.EqualTo(10));
        Assert.That(pagedResult.Items[0].Id, Is.EqualTo(1));
    }

    [Test]
    public void GetProjects_AuthorizedUser_OtherRole_ReturnsPagedEmptyResults()
    {
        SetUserClaims("1", Role.Other.ToString());

        var result = _controller.GetProjects();
        Assert.That(result, Is.TypeOf(typeof(OkObjectResult)));

        var okResult = (OkObjectResult)result;
        Assert.That(okResult.Value, Is.TypeOf(typeof(PagedResultDTO<ProjectDTO>)));

        var pagedResult = (PagedResultDTO<ProjectDTO>)okResult.Value;

        Assert.That(pagedResult.Items.Count, Is.EqualTo(0));
    }

    [Test]
    public void GetProject_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var result = _controller.GetProject(1);

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void GetProject_AuthorizedUser_ReturnsProject()
    {
        SetUserClaims("1", Role.Freelancer.ToString());

        var result = _controller.GetProject(1);
        Assert.That(result, Is.TypeOf(typeof(OkObjectResult)));

        var okResult = (OkObjectResult)result;
        Assert.That(okResult.Value, Is.TypeOf(typeof(ProjectDTO)));

        var projectResult = (ProjectDTO)okResult.Value;

        Assert.That(projectResult.Id, Is.EqualTo(1));
        Assert.That(projectResult.Name, Is.EqualTo("Website Development"));
        Assert.That(projectResult.FreelancerId, Is.EqualTo(1));
        Assert.That(projectResult.CustomerId, Is.EqualTo(3));
    }

    [Test]
    public void GetProject_AuthorizedUser_OtherRole_ReturnsEmptyResult()
    {
        SetUserClaims("1", Role.Other.ToString());

        var result = _controller.GetProject(1);
        Assert.That(result, Is.TypeOf(typeof(NotFoundResult)));
    }

    [Test]
    public void CreateProject_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var newProject = new Project { };

        var result = _controller.CreateProject(newProject);

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void CreateProject_AuthorizedUser()
    {
        SetUserClaims("1", Role.Freelancer.ToString());

        var newProject = new Project
        {
            Name = "Project 013",
            Deadline = new DateTime(2024, 08, 12),
            CustomerId = 3
        };

        var result = _controller.CreateProject(newProject);
        Assert.That(result, Is.TypeOf(typeof(OkObjectResult)));

        var okResult = (OkObjectResult)result;
        Assert.That(okResult.Value, Is.TypeOf(typeof(Project)));

        var projectResult = (Project)okResult.Value;

        Assert.That(projectResult.Id, Is.EqualTo(13));
        Assert.That(projectResult.Name, Is.EqualTo("Project 013"));
        Assert.That(projectResult.FreelancerId, Is.EqualTo(1));
        Assert.That(projectResult.CustomerId, Is.EqualTo(3));
        Assert.That(projectResult.Deadline, Is.EqualTo(new DateTime(2024, 08, 12)));

        var resultProjects = _controller.GetProjects();
        var okResultProjects = (OkObjectResult)resultProjects;
        var pagedResultProjects = (PagedResultDTO<ProjectDTO>)okResultProjects.Value;

        Assert.That(pagedResultProjects.TotalItems, Is.EqualTo(13));
    }

    [Test]
    public void UpdateProject_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var changedProject = new Project { };
        var result = _controller.UpdateProject(1, changedProject);

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void UpdateProject_AuthorizedUser_NonOwnerProject_ReturnsNotFound()
    {
        SetUserClaims("2", Role.Freelancer.ToString());

        var changedProject = new Project
        {
            Name = "Project 001 Updated",
            Deadline = new DateTime(2024, 08, 13),
            CustomerId = 3
        };

        var result = _controller.UpdateProject(1, changedProject);

        Assert.That(result, Is.TypeOf(typeof(NotFoundResult)));
    }

    [Test]
    public void UpdateProject_AuthorizedUser()
    {
        SetUserClaims("1", Role.Freelancer.ToString());

        var changedProject = new Project
        {
            Name = "Project 001 Updated",
            Deadline = new DateTime(2024, 08, 13),
            CustomerId = 3
        };

        var result = _controller.UpdateProject(1, changedProject);
        Assert.That(result, Is.TypeOf(typeof(OkObjectResult)));

        var okResult = (OkObjectResult)result;
        Assert.That(okResult.Value, Is.TypeOf(typeof(Project)));

        var projectResult = (Project)okResult.Value;

        Assert.That(projectResult.Id, Is.EqualTo(1));
        Assert.That(projectResult.Name, Is.EqualTo("Project 001 Updated"));
        Assert.That(projectResult.FreelancerId, Is.EqualTo(1));
        Assert.That(projectResult.CustomerId, Is.EqualTo(3));
        Assert.That(projectResult.Deadline, Is.EqualTo(new DateTime(2024, 08, 13)));
    }

    [Test]
    public void DeleteProject_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var result = _controller.DeleteProject(13);

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void DeleteProject_AuthorizedUser_NonOwnerProject_ReturnsNotFound()
    {
        SetUserClaims("2", Role.Freelancer.ToString());
        var result = _controller.DeleteProject(13);

        Assert.That(result, Is.TypeOf(typeof(NotFoundResult)));
    }

    [Test]
    public void DeleteProject_AuthorizedUser_ReturnsNotContent()
    {
        SetUserClaims("1", Role.Freelancer.ToString());
        var result = _controller.DeleteProject(13);

        Assert.That(result, Is.TypeOf(typeof(NoContentResult)));
    }

}