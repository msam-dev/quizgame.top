using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace quizgame.top.API.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(15)]
    public required string Username { get; set; }

    [Required]
    public required string Password { get; set; }

    public int AnswerCount { get; set; } = 0;
    public int CorrectCount { get; set; } = 0;

    [EmailAddress]
    [MaxLength(200)]
    public string Email { get; set; } = "placeholder@placeholder.com"; //Not currently supporting email validation but will eventually

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }
}

