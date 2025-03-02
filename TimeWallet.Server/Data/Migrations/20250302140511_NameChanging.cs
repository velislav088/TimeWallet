using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeWallet.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class NameChanging : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_usersReceipts_AspNetUsers_UserId",
                table: "usersReceipts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_usersReceipts",
                table: "usersReceipts");

            migrationBuilder.RenameTable(
                name: "usersReceipts",
                newName: "UsersReceipts");

            migrationBuilder.RenameIndex(
                name: "IX_usersReceipts_UserId",
                table: "UsersReceipts",
                newName: "IX_UsersReceipts_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersReceipts",
                table: "UsersReceipts",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_UsersReceipts_AspNetUsers_UserId",
                table: "UsersReceipts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersReceipts_AspNetUsers_UserId",
                table: "UsersReceipts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersReceipts",
                table: "UsersReceipts");

            migrationBuilder.RenameTable(
                name: "UsersReceipts",
                newName: "usersReceipts");

            migrationBuilder.RenameIndex(
                name: "IX_UsersReceipts_UserId",
                table: "usersReceipts",
                newName: "IX_usersReceipts_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_usersReceipts",
                table: "usersReceipts",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_usersReceipts_AspNetUsers_UserId",
                table: "usersReceipts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
