using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace quizgame.top.API.Migrations
{
    /// <inheritdoc />
    public partial class Migration3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Score",
                table: "Users",
                newName: "CorrectCount");

            migrationBuilder.AddColumn<int>(
                name: "AnswerCount",
                table: "Users",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnswerCount",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "CorrectCount",
                table: "Users",
                newName: "Score");
        }
    }
}
