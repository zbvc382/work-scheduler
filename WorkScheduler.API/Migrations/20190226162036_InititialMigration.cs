using Microsoft.EntityFrameworkCore.Migrations;

namespace WorkScheduler.API.Migrations
{
    public partial class InititialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "slotIndex",
                table: "Jobs",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "slotReplaced",
                table: "Jobs",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "slotIndex",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "slotReplaced",
                table: "Jobs");
        }
    }
}
