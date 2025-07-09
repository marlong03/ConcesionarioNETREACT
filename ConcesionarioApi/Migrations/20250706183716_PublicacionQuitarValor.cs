using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConcesionarioApi.Migrations
{
    /// <inheritdoc />
    public partial class PublicacionQuitarValor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Valor",
                table: "Publicaciones");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Valor",
                table: "Publicaciones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
