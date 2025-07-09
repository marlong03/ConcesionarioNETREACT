using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConcesionarioApi.Migrations
{
    /// <inheritdoc />
    public partial class QuitamosCarroMotoPorProblemas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Publicaciones_VehiculoBase_VehiculoId",
                table: "Publicaciones");

            migrationBuilder.DropForeignKey(
                name: "FK_ReglasPrecio_VehiculoBase_VehiculoId",
                table: "ReglasPrecio");

            migrationBuilder.DropPrimaryKey(
                name: "PK__pruebas__3213E83F141F5B18",
                table: "pruebas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehiculoBase",
                table: "VehiculoBase");

            migrationBuilder.DropColumn(
                name: "Cilindraje",
                table: "VehiculoBase");

            migrationBuilder.DropColumn(
                name: "Puertas",
                table: "VehiculoBase");

            migrationBuilder.DropColumn(
                name: "Velocidades",
                table: "VehiculoBase");

            migrationBuilder.RenameTable(
                name: "VehiculoBase",
                newName: "Vehiculos");

            migrationBuilder.AlterColumn<string>(
                name: "Tipo",
                table: "Vehiculos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)",
                oldMaxLength: 13);

            migrationBuilder.AddPrimaryKey(
                name: "PK_pruebas",
                table: "pruebas",
                column: "id");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Publicaciones_Vehiculos_VehiculoId",
                table: "Publicaciones");

            migrationBuilder.DropForeignKey(
                name: "FK_ReglasPrecio_Vehiculos_VehiculoId",
                table: "ReglasPrecio");

            migrationBuilder.DropPrimaryKey(
                name: "PK_pruebas",
                table: "pruebas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vehiculos",
                table: "Vehiculos");

            migrationBuilder.RenameTable(
                name: "Vehiculos",
                newName: "VehiculoBase");

            migrationBuilder.AlterColumn<string>(
                name: "Tipo",
                table: "VehiculoBase",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "Cilindraje",
                table: "VehiculoBase",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Puertas",
                table: "VehiculoBase",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Velocidades",
                table: "VehiculoBase",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK__pruebas__3213E83F141F5B18",
                table: "pruebas",
                column: "id");

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
    }
}
