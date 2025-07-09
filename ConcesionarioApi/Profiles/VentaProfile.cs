using AutoMapper;
using ConcesionarioApi.Models;
using ConcesionarioApi.DTOs.VentaDTO;

namespace ConcesionarioApi.Profiles
{
    public class VentaProfile : Profile
    {
        public VentaProfile()
        {
            CreateMap<Venta, VentaDetailDTO>();
            CreateMap<VentaCreateDTO, Venta>();
                
        }
    }
}
