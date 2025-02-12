using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeWallet.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class PascalCaseAppliedForElementsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Elements_Budgets_budgetId",
                table: "Elements");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Elements",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "createdAt",
                table: "Elements",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "budgetId",
                table: "Elements",
                newName: "BudgetId");

            migrationBuilder.RenameColumn(
                name: "amount",
                table: "Elements",
                newName: "Amount");

            migrationBuilder.RenameIndex(
                name: "IX_Elements_budgetId",
                table: "Elements",
                newName: "IX_Elements_BudgetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Elements_Budgets_BudgetId",
                table: "Elements",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Elements_Budgets_BudgetId",
                table: "Elements");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Elements",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Elements",
                newName: "createdAt");

            migrationBuilder.RenameColumn(
                name: "BudgetId",
                table: "Elements",
                newName: "budgetId");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Elements",
                newName: "amount");

            migrationBuilder.RenameIndex(
                name: "IX_Elements_BudgetId",
                table: "Elements",
                newName: "IX_Elements_budgetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Elements_Budgets_budgetId",
                table: "Elements",
                column: "budgetId",
                principalTable: "Budgets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
