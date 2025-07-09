using ConcesionarioApi.Models;
using System.ComponentModel.DataAnnotations;

namespace ConcesionarioApi.Models
{
    public class ReglaPrecio
    {
        public int Id { get; set; }
        public decimal Precio { get; set; }
        public DateTime? FechaCreacion { get; set; }


        public int VehiculoId { get; set; }
        public Vehiculo Vehiculo { get; set; }


    }
}
