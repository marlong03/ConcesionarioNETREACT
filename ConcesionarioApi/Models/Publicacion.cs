namespace ConcesionarioApi.Models
{
    public class Publicacion
    {
        public int Id { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string Color { get; set; }
        public int Kilometraje { get; set; }
        public bool EsNuevo { get; set; }
        public decimal Precio { get; set; }
        public string EstadoDisponibilidad { get; set; } // disponible o vendido

        public int VehiculoId { get; set; }
        public Vehiculo Vehiculo { get; set; }
    }

}