namespace ConcesionarioApi.Models
{
    public class Vehiculo
    {
        public int Id { get; set; }
        public string Modelo { get; set; }
        public string Tipo { get; set; }
        public string? ImagenUrl { get; set; }
        public DateTime FechaCreacion { get; set; }

        public int? Puertas { get; set; }
        public int? Cilindraje { get; set; }
        public int? Velocidades { get; set; }


    }
   
}
