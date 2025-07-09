using AutoMapper;
using ConcesionarioApi.Models;
using ConcesionarioApi.DTOs.ReglaPrecioDTO;

namespace ConcesionarioApi.Profiles
{
    public class ReglaPrecioProfile : Profile
    {
        public ReglaPrecioProfile()
        {
            CreateMap<ReglaPrecio, ReglaPrecioDetailDTO>();
            CreateMap<ReglaPrecioCreateDTO, ReglaPrecio>();
               
        }
    }
}
