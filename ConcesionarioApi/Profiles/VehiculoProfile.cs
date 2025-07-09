using AutoMapper;
using ConcesionarioApi.Models;
using ConcesionarioApi.DTOs.VehiculoDTO;

namespace ConcesionarioApi.Profiles
{
    public class VehiculoProfile : Profile
    {
        public VehiculoProfile()
        {
            CreateMap<VehiculoCreateDTO, Vehiculo>();
            CreateMap<Vehiculo, VehiculoDetailDTO>();



        }
    }
}

