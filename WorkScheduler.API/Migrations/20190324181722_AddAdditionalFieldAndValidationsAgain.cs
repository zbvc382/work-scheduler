using Microsoft.EntityFrameworkCore.Migrations;

namespace WorkScheduler.API.Migrations
{
    public partial class AddAdditionalFieldAndValidationsAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AgencyContactName",
                table: "Jobs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AgencyPhone",
                table: "Jobs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AgencyContactName",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "AgencyPhone",
                table: "Jobs");
        }
    }
}
