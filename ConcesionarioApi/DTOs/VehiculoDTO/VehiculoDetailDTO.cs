namespace ConcesionarioApi.DTOs.VehiculoDTO
{
    public class VehiculoDetailDTO
    {
        public int Id { get; set; }
        public string Modelo { get; set; }

        public string ImagenUrl { get; set; }
        public DateTime FechaCreacion { get; set; }

        public string Tipo { get; set; } 
        public int? Puertas { get; set; }

        public int? Cilindraje { get; set; }
        public int? Velocidades { get; set; }

    }
}
