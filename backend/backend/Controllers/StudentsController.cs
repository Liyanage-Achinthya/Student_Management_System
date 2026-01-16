using backend.Data;
using backend.Models;
using backend.Models.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public StudentsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult getAllStudents() 
        {
            var allStudents = dbContext.Students.ToList();

            return Ok(allStudents);
        }

        [HttpGet("by-telephone/{telephone}")]
        public IActionResult getStudentsByTel(string telephone)
        {
            var student = dbContext.Students
                .FirstOrDefault(s => s.Telephone == telephone);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        [HttpPost]
        public IActionResult addStudents(AddStudentDto addStudentDto) 
        {
            var studetEntity = new Student()
            {
                FullName = addStudentDto.FullName,
                Address = addStudentDto.Address,
                DateOfBirth = addStudentDto.DateOfBirth,
                Gender = addStudentDto.Gender,
                Email = addStudentDto.Email,
                Telephone = addStudentDto.Telephone
            };

            dbContext.Students.Add(studetEntity);
            dbContext.SaveChanges();

            return Ok(studetEntity);
        }

        [HttpPut("{id:int}")]
        public IActionResult updateStudents(int id, UpdateStudentDto updateStudentDto)
        {
            var student = dbContext.Students.Find(id);

            if (student == null)
            {
                return NotFound();
            }

            student.FullName = updateStudentDto.FullName;
            student.DateOfBirth = updateStudentDto.DateOfBirth;
            student.Email = updateStudentDto.Email;
            student.Telephone = updateStudentDto.Telephone;

            dbContext.SaveChanges();

            return Ok(student);
        }

        [HttpDelete("{id:int}")]
        public IActionResult deleteStudents(int id) 
        {
            var student = dbContext.Students.Find(id);

            if (student is null) 
            {
                return NotFound();
            }

            dbContext.Students.Remove(student);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}
