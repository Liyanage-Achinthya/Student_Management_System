namespace backend.Models
{
    public class UpdateStudentDto
    {
        public required string FullName { get; set; }
        public required DateTime DateOfBirth { get; set; }
        public required string Email { get; set; }
        public required string Telephone { get; set; }
    }
}
