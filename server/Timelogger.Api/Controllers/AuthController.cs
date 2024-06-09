using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Timelogger.Dto;
using Timelogger.Entities;

namespace Timelogger.Api.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly ApiContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApiContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(UserAuthDTO payload)
        {
            var user = _context.Users.SingleOrDefault(u =>
                u.Email == payload.Email && u.Password == payload.Password
            );

            if (user == null)
            {
                return Unauthorized();
            }

            var token = GenerateToken(user);
            return Ok(new { token });
        }

        private string GenerateToken(User user)
        {
            var claims = new Claim[]
            {
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", user.Email),
                new Claim("Role", user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Auth:Jwt:Key"])
            );

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Auth:Jwt:Issuer"],
                audience: _configuration["Auth:Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(90),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
