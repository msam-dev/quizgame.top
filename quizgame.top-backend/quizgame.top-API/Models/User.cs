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

    [EmailAddress]
    [MaxLength(200)]
    public string Email { get; set; } = "placeholder@placeholder.com";

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }
}

