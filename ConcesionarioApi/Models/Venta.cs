namespace ConcesionarioApi.Models
{
    public class Venta
    {
        public int Id { get; set; }
        public DateTime? FechaCreacion { get; set; }


        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        public int PublicacionId { get; set; }
        public Publicacion Publicacion { get; set; }
    }

}
