using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConcesionarioApi.Migrations
{
    /// <inheritdoc />
    public partial class AñadimosCamposOpcionalesVehiculos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Cilindraje",
                table: "Vehiculos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Puertas",
                table: "Vehiculos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Velocidades",
                table: "Vehiculos",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cilindraje",
                table: "Vehiculos");

            migrationBuilder.DropColumn(
                name: "Puertas",
                table: "Vehiculos");

            migrationBuilder.DropColumn(
                name: "Velocidades",
                table: "Vehiculos");
        }
    }
}
