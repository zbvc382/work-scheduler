using Microsoft.EntityFrameworkCore.Migrations;

namespace WorkScheduler.API.Migrations
{
    public partial class ChangeJobModelProperyName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Agency",
                table: "Jobs",
                newName: "AgencyName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AgencyName",
                table: "Jobs",
                newName: "Agency");
        }
    }
}
