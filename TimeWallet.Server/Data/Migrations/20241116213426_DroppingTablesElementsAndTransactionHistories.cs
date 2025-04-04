﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeWallet.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class DroppingTablesElementsAndTransactionHistories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Elements");

            migrationBuilder.DropTable(
                name: "TransactionsHistories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TransactionsHistories",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(55)", maxLength: 55, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionsHistories", x => x.id);
                    table.ForeignKey(
                        name: "FK_TransactionsHistories_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Elements",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionHistoriesId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(55)", maxLength: 55, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TypeOfTransaction = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Elements", x => x.id);
                    table.ForeignKey(
                        name: "FK_Elements_TransactionsHistories_TransactionHistoriesId",
                        column: x => x.TransactionHistoriesId,
                        principalTable: "TransactionsHistories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Elements_TransactionHistoriesId",
                table: "Elements",
                column: "TransactionHistoriesId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionsHistories_UserId",
                table: "TransactionsHistories",
                column: "UserId");
        }
    }
}
