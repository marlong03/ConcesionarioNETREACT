using System;
using ConcesionarioApi.DTOs.VehiculoDTO;

namespace ConcesionarioApi.DTOs.PublicacionDTO
{
    public class PublicacionDetailDTO
    {
        public int Id { get; set; }
        public DateTime FechaCreacion { get; set; }
        public decimal Precio { get; set; }

        public string Color { get; set; }

        public int Kilometraje { get; set; }


        public bool EsNuevo { get; set; }
        public string EstadoDisponibilidad { get; set; } 

        public VehiculoDetailDTO Vehiculo { get; set; }
    }
}
