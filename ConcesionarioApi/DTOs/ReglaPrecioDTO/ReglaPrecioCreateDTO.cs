using System.ComponentModel.DataAnnotations;

namespace ConcesionarioApi.DTOs.ReglaPrecioDTO
{
    public class ReglaPrecioCreateDTO
    {
        [Required(ErrorMessage = "El precio es obligatorio.")]
        [Range(1, double.MaxValue, ErrorMessage = "El precio debe ser mayor a 0.")]
        public decimal Precio { get; set; }

        [Required(ErrorMessage = "El ID del vehículo es obligatorio.")]
        public int VehiculoId { get; set; }
    }
}
