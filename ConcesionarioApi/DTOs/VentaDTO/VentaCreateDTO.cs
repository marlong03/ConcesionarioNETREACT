using System.ComponentModel.DataAnnotations;

namespace ConcesionarioApi.DTOs.VentaDTO
{
    public class VentaCreateDTO
    {
        [Required(ErrorMessage = "El ID del cliente es obligatorio.")]
        public int ClienteId { get; set; }

        [Required(ErrorMessage = "El ID de la publicación es obligatorio.")]
        public int PublicacionId { get; set; }
    }
}
