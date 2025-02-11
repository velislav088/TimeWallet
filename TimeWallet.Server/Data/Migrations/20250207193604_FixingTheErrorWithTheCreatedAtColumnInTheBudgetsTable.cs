using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeWallet.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixingTheErrorWithTheCreatedAtColumnInTheBudgetsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Budgets",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Budgets");
        }
    }
}
