using System.ComponentModel.DataAnnotations;

namespace ConcesionarioApi.DTOs.VehiculoDTO
{
    public class VehiculoCreateDTO
    {

        [Required]
        public string Modelo { get; set; }

        public string? ImagenUrl { get; set; }

        
        [Required]
        public string Tipo { get; set; } 

        public int? Puertas { get; set; }

        [Range(1, 400, ErrorMessage = "El cilindraje debe estar entre 1 y 400")]
        public int? Cilindraje { get; set; }
        public int? Velocidades { get; set; }
    }
}
