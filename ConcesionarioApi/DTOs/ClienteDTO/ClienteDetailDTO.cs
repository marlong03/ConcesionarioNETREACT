using System;

namespace ConcesionarioApi.DTOs.ClienteDTO
{
    public class ClienteDetailDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Documento { get; set; }
        public DateTime FechaCreacion { get; set; }


    }
}
