using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeWallet.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class DateTypeNamingChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "Receipts",
                newName: "createdAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "createdAt",
                table: "Receipts",
                newName: "DateTime");
        }
    }
}
