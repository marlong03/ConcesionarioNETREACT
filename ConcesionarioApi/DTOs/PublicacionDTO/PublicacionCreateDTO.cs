using System.ComponentModel.DataAnnotations;

namespace ConcesionarioApi.DTOs.PublicacionDTO
{
    public class PublicacionCreateDTO
    {
        [Required(ErrorMessage = "El precio es obligatorio.")]
        [Range(1, 250000000, ErrorMessage = "El precio debe estar entre 1 y 250000000")]
        public decimal Precio { get; set; }

        [Required]
        public string Color { get; set; }
            
        [Required]
        public int Kilometraje { get; set; }

        [Required]
        public bool EsNuevo { get; set; }
        [Required(ErrorMessage = "El estado de disponibilidad es obligatorio.")]
        public string EstadoDisponibilidad { get; set; }

        [Required(ErrorMessage = "El ID del vehículo es obligatorio.")]
        public int VehiculoId { get; set; }
    }
}
