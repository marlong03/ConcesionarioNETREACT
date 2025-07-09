using System;
using ConcesionarioApi.DTOs.VehiculoDTO;

namespace ConcesionarioApi.DTOs.ReglaPrecioDTO
{
    public class ReglaPrecioDetailDTO
    {
        public int Id { get; set; }
        public decimal Precio { get; set; }
        public DateTime FechaCreacion { get; set; }

        public int VehiculoId { get; set; }
        public VehiculoDetailDTO Vehiculo { get; set; }
    }
}
