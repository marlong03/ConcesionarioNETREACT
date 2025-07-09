using System.ComponentModel.DataAnnotations;

namespace ConcesionarioApi.DTOs.ClienteDTO
{
    public class ClienteCreateDTO
    {
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre no debe exceder los 100 caracteres.")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El número de documento es obligatorio.")]
        [StringLength(20, ErrorMessage = "El documento no debe exceder los 20 caracteres.")]
        public string Documento { get; set; }
    }
}
