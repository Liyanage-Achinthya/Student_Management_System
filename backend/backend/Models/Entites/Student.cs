namespace backend.Models.Entites
{
    public class Student
    {
        public int Id { get; set; }
        public required string FullName { get; set; }
        public required string Address { get; set; }
        public required DateTime DateOfBirth { get; set; }
        public required string Gender { get; set; }
        public required string Email { get; set; }
        public required string Telephone { get; set; }
    }
}
