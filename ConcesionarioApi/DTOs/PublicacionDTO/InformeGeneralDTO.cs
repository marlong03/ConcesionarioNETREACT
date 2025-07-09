namespace ConcesionarioApi.DTOs.PublicacionDTO
{
    public class InformeGeneralDTO
    {
        public Dictionary<string, decimal> VentasPorTipo { get; set; }
        public Dictionary<string, decimal> VentasPorModelo { get; set; }

    }
}
