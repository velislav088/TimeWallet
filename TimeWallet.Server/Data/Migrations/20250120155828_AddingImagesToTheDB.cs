using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeWallet.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingImagesToTheDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Receipts",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ReceiptItems",
                newName: "id");

            migrationBuilder.AddColumn<byte[]>(
                name: "ShopImage",
                table: "Receipts",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShopImage",
                table: "Receipts");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Receipts",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "ReceiptItems",
                newName: "Id");
        }
    }
}
