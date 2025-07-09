using System;
using ConcesionarioApi.DTOs.ClienteDTO;
using ConcesionarioApi.DTOs.PublicacionDTO;

namespace ConcesionarioApi.DTOs.VentaDTO
{
    public class VentaDetailDTO
    {
        public int Id { get; set; }
        public DateTime FechaCreacion { get; set; }

        public ClienteDetailDTO Cliente { get; set; }
        public PublicacionDetailDTO Publicacion { get; set; }
    }
}
