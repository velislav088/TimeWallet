using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeWallet.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class GettingTheDbFreshUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ElementsP_Payments_PaymentId",
                table: "ElementsP");

            migrationBuilder.DropForeignKey(
                name: "FK_IncomeHistory_Accounts_AccountId",
                table: "IncomeHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PaymentHistories_PaymentHistoryId",
                table: "Payments");

            migrationBuilder.DropTable(
                name: "ElementsI");

            migrationBuilder.DropTable(
                name: "PaymentHistories");

            migrationBuilder.DropTable(
                name: "TransactionHistories");

            migrationBuilder.DropTable(
                name: "Incomes");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropIndex(
                name: "IX_IncomeHistory_AccountId",
                table: "IncomeHistory");

            migrationBuilder.DropIndex(
                name: "IX_ElementsP_PaymentId",
                table: "ElementsP");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "IncomeHistory");

            migrationBuilder.RenameColumn(
                name: "PaymentHistoryId",
                table: "Payments",
                newName: "TransactionHistorysId");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_PaymentHistoryId",
                table: "Payments",
                newName: "IX_Payments_TransactionHistorysId");

            migrationBuilder.RenameColumn(
                name: "PaymentId",
                table: "ElementsP",
                newName: "TypeOfTransaction");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "IncomeHistory",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TransactionHistoriesId",
                table: "ElementsP",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_IncomeHistory_UserId",
                table: "IncomeHistory",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementsP_TransactionHistoriesId",
                table: "ElementsP",
                column: "TransactionHistoriesId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_IncomeHistory_TransactionHistorysId",
                table: "Payments",
                column: "TransactionHistorysId",
                principalTable: "IncomeHistory",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ElementsP_IncomeHistory_TransactionHistoriesId",
                table: "ElementsP");

            migrationBuilder.DropForeignKey(
                name: "FK_IncomeHistory_AspNetUsers_UserId",
                table: "IncomeHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_IncomeHistory_TransactionHistorysId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_IncomeHistory_UserId",
                table: "IncomeHistory");

            migrationBuilder.DropIndex(
                name: "IX_ElementsP_TransactionHistoriesId",
                table: "ElementsP");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "IncomeHistory");

            migrationBuilder.DropColumn(
                name: "TransactionHistoriesId",
                table: "ElementsP");

            migrationBuilder.RenameColumn(
                name: "TransactionHistorysId",
                table: "Payments",
                newName: "PaymentHistoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_TransactionHistorysId",
                table: "Payments",
                newName: "IX_Payments_PaymentHistoryId");

            migrationBuilder.RenameColumn(
                name: "TypeOfTransaction",
                table: "ElementsP",
                newName: "PaymentId");

            migrationBuilder.AddColumn<int>(
                name: "AccountId",
                table: "IncomeHistory",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Ballance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LastTimeLogin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MonthlyIncome = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(55)", maxLength: 55, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.id);
                    table.ForeignKey(
                        name: "FK_Accounts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Incomes",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IncomeHistoryId = table.Column<int>(type: "int", nullable: false),
                    IncomeBalance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IncomeDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MoneySource = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incomes", x => x.id);
                    table.ForeignKey(
                        name: "FK_Incomes_IncomeHistory_IncomeHistoryId",
                        column: x => x.IncomeHistoryId,
                        principalTable: "IncomeHistory",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaymentHistories",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(55)", maxLength: 55, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentHistories", x => x.id);
                    table.ForeignKey(
                        name: "FK_PaymentHistories_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TransactionHistories",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    Balance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(55)", maxLength: 55, nullable: false),
                    To = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    TransactionMadeDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionHistories", x => x.id);
                    table.ForeignKey(
                        name: "FK_TransactionHistories_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ElementsI",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IncomeId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(55)", maxLength: 55, nullable: false),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElementsI", x => x.id);
                    table.ForeignKey(
                        name: "FK_ElementsI_Incomes_IncomeId",
                        column: x => x.IncomeId,
                        principalTable: "Incomes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_IncomeHistory_AccountId",
                table: "IncomeHistory",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementsP_PaymentId",
                table: "ElementsP",
                column: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_UserId",
                table: "Accounts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementsI_IncomeId",
                table: "ElementsI",
                column: "IncomeId");

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_IncomeHistoryId",
                table: "Incomes",
                column: "IncomeHistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentHistories_AccountId",
                table: "PaymentHistories",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionHistories_AccountId",
                table: "TransactionHistories",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_ElementsP_Payments_PaymentId",
                table: "ElementsP",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_IncomeHistory_Accounts_AccountId",
                table: "IncomeHistory",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_PaymentHistories_PaymentHistoryId",
                table: "Payments",
                column: "PaymentHistoryId",
                principalTable: "PaymentHistories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
