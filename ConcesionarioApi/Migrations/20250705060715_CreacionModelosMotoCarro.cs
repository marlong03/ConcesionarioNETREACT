using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConcesionarioApi.Migrations
{
    /// <inheritdoc />
    public partial class CreacionModelosMotoCarro : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Cilindraje",
                table: "Vehiculos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tipo",
                table: "Vehiculos",
                type: "nvarchar(8)",
                maxLength: 8,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Velocidades",
                table: "Vehiculos",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cilindraje",
                table: "Vehiculos");

            migrationBuilder.DropColumn(
                name: "Tipo",
                table: "Vehiculos");

            migrationBuilder.DropColumn(
                name: "Velocidades",
                table: "Vehiculos");
        }
    }
}
