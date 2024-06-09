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
using Timelogger.Entities;
using Timelogger.Enums;

[TestFixture]
public class TaskTypesControllerTests
{
    private ApiContext _context;
    private TaskTypesController _controller;

    [SetUp]
    public void SetUp()
    {
        var options = new DbContextOptionsBuilder<ApiContext>()
            .UseInMemoryDatabase(databaseName: "TaskTypesTestDatabase")
            .Options;

        _context = new ApiContext(options);
        _controller = new TaskTypesController(_context);

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
    public void GetTypes_UnauthorizedUser_ReturnsUnauthorized()
    {
        SetUserClaims(null, null);
        var result = _controller.GetTaskTypes();

        Assert.That(result, Is.TypeOf(typeof(UnauthorizedResult)));
    }

    [Test]
    public void GetTypes_AuthorizedUser_ReturnsCategories()
    {
        SetUserClaims("1", Role.Freelancer.ToString());
        var result = _controller.GetTaskTypes();

        Assert.That(result, Is.TypeOf(typeof(OkObjectResult)));

        var okResult = (OkObjectResult)result;
        Assert.That(okResult.Value, Is.TypeOf(typeof(List<TaskType>)));

        var categoriesResult = (List<TaskType>)okResult.Value;

        Assert.That(categoriesResult.Count, Is.EqualTo(4));
        Assert.That(categoriesResult[0].Id, Is.EqualTo(1));
    }
}