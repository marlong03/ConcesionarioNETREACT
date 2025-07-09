using AutoMapper;
using ConcesionarioApi.Models;
using ConcesionarioApi.DTOs.PublicacionDTO;

namespace ConcesionarioApi.Profiles
{
    public class PublicacionProfile : Profile
    {
        public PublicacionProfile()
        {
            CreateMap<Publicacion, PublicacionDetailDTO>();
            CreateMap<PublicacionCreateDTO, Publicacion>();
                
        }
    }
}
