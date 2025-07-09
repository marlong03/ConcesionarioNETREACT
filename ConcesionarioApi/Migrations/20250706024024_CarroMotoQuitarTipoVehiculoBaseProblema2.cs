using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConcesionarioApi.Migrations
{
    /// <inheritdoc />
    public partial class CarroMotoQuitarTipoVehiculoBaseProblema2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Publicaciones_Vehiculos_VehiculoId",
                table: "Publicaciones");

            migrationBuilder.DropForeignKey(
                name: "FK_ReglasPrecio_Vehiculos_VehiculoId",
                table: "ReglasPrecio");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vehiculos",
                table: "Vehiculos");

            migrationBuilder.RenameTable(
                name: "Vehiculos",
                newName: "VehiculoBase");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehiculoBase",
                table: "VehiculoBase",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Publicaciones_VehiculoBase_VehiculoId",
                table: "Publicaciones",
                column: "VehiculoId",
                principalTable: "VehiculoBase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReglasPrecio_VehiculoBase_VehiculoId",
                table: "ReglasPrecio",
                column: "VehiculoId",
                principalTable: "VehiculoBase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Publicaciones_VehiculoBase_VehiculoId",
                table: "Publicaciones");

            migrationBuilder.DropForeignKey(
                name: "FK_ReglasPrecio_VehiculoBase_VehiculoId",
                table: "ReglasPrecio");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehiculoBase",
                table: "VehiculoBase");

            migrationBuilder.RenameTable(
                name: "VehiculoBase",
                newName: "Vehiculos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vehiculos",
                table: "Vehiculos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Publicaciones_Vehiculos_VehiculoId",
                table: "Publicaciones",
                column: "VehiculoId",
                principalTable: "Vehiculos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
