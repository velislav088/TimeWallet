using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeWallet.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class GettingTheDbFreshUpdatePart_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ElementsP_IncomeHistory_TransactionHistoriesId",
                table: "ElementsP");

            migrationBuilder.DropForeignKey(
                name: "FK_IncomeHistory_AspNetUsers_UserId",
                table: "IncomeHistory");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_IncomeHistory",
                table: "IncomeHistory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ElementsP",
                table: "ElementsP");

            migrationBuilder.RenameTable(
                name: "IncomeHistory",
                newName: "TransactionsHistories");

            migrationBuilder.RenameTable(
                name: "ElementsP",
                newName: "Elements");

            migrationBuilder.RenameIndex(
                name: "IX_IncomeHistory_UserId",
                table: "TransactionsHistories",
                newName: "IX_TransactionsHistories_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ElementsP_TransactionHistoriesId",
                table: "Elements",
                newName: "IX_Elements_TransactionHistoriesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TransactionsHistories",
                table: "TransactionsHistories",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Elements",
                table: "Elements",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Elements_TransactionsHistories_TransactionHistoriesId",
                table: "Elements",
                column: "TransactionHistoriesId",
                principalTable: "TransactionsHistories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionsHistories_AspNetUsers_UserId",
                table: "TransactionsHistories",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Elements_TransactionsHistories_TransactionHistoriesId",
                table: "Elements");

            migrationBuilder.DropForeignKey(
                name: "FK_TransactionsHistories_AspNetUsers_UserId",
                table: "TransactionsHistories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TransactionsHistories",
                table: "TransactionsHistories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Elements",
                table: "Elements");

            migrationBuilder.RenameTable(
                name: "TransactionsHistories",
                newName: "IncomeHistory");

            migrationBuilder.RenameTable(
                name: "Elements",
                newName: "ElementsP");

            migrationBuilder.RenameIndex(
                name: "IX_TransactionsHistories_UserId",
                table: "IncomeHistory",
                newName: "IX_IncomeHistory_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Elements_TransactionHistoriesId",
                table: "ElementsP",
                newName: "IX_ElementsP_TransactionHistoriesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IncomeHistory",
                table: "IncomeHistory",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ElementsP",
                table: "ElementsP",
                column: "id");

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionHistorysId = table.Column<int>(type: "int", nullable: false),
                    MoneySpend = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SpendTo = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.id);
                    table.ForeignKey(
                        name: "FK_Payments_IncomeHistory_TransactionHistorysId",
                        column: x => x.TransactionHistorysId,
                        principalTable: "IncomeHistory",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_TransactionHistorysId",
                table: "Payments",
                column: "TransactionHistorysId");

            migrationBuilder.AddForeignKey(
                name: "FK_ElementsP_IncomeHistory_TransactionHistoriesId",
                table: "ElementsP",
                column: "TransactionHistoriesId",
                principalTable: "IncomeHistory",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_IncomeHistory_AspNetUsers_UserId",
                table: "IncomeHistory",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
