using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConcesionarioApi.Migrations
{
    /// <inheritdoc />
    public partial class ProblemaReglaPrecio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReglasPrecio_Vehiculos_VehiculoId",
                table: "ReglasPrecio");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReglasPrecio",
                table: "ReglasPrecio");

            migrationBuilder.RenameTable(
                name: "ReglasPrecio",
                newName: "ReglaPrecio");

            migrationBuilder.RenameIndex(
                name: "IX_ReglasPrecio_VehiculoId",
                table: "ReglaPrecio",
                newName: "IX_ReglaPrecio_VehiculoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReglaPrecio",
                table: "ReglaPrecio",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReglaPrecio_Vehiculos_VehiculoId",
                table: "ReglaPrecio",
                column: "VehiculoId",
                principalTable: "Vehiculos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReglaPrecio_Vehiculos_VehiculoId",
                table: "ReglaPrecio");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReglaPrecio",
                table: "ReglaPrecio");

            migrationBuilder.RenameTable(
                name: "ReglaPrecio",
                newName: "ReglasPrecio");

            migrationBuilder.RenameIndex(
                name: "IX_ReglaPrecio_VehiculoId",
                table: "ReglasPrecio",
                newName: "IX_ReglasPrecio_VehiculoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReglasPrecio",
                table: "ReglasPrecio",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReglasPrecio_Vehiculos_VehiculoId",
                table: "ReglasPrecio",
                column: "VehiculoId",
                principalTable: "Vehiculos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
