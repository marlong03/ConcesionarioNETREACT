using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConcesionarioApi.Migrations
{
    /// <inheritdoc />
    public partial class ReglaUnica : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ReglaPrecio_VehiculoId",
                table: "ReglaPrecio");

            migrationBuilder.CreateIndex(
                name: "IX_ReglaPrecio_VehiculoId",
                table: "ReglaPrecio",
                column: "VehiculoId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ReglaPrecio_VehiculoId",
                table: "ReglaPrecio");

            migrationBuilder.CreateIndex(
                name: "IX_ReglaPrecio_VehiculoId",
                table: "ReglaPrecio",
                column: "VehiculoId");
        }
    }
}
