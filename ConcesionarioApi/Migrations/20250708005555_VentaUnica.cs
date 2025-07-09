using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConcesionarioApi.Migrations
{
    /// <inheritdoc />
    public partial class VentaUnica : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Ventas_PublicacionId",
                table: "Ventas");

            migrationBuilder.CreateIndex(
                name: "IX_Ventas_PublicacionId",
                table: "Ventas",
                column: "PublicacionId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Ventas_PublicacionId",
                table: "Ventas");

            migrationBuilder.CreateIndex(
                name: "IX_Ventas_PublicacionId",
                table: "Ventas",
                column: "PublicacionId");
        }
    }
}
