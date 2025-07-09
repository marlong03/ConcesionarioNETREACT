using AutoMapper;
using ConcesionarioApi.Models;
using ConcesionarioApi.DTOs.ClienteDTO;

namespace ConcesionarioApi.Profiles
{
    public class ClienteProfile : Profile
    {
        public ClienteProfile()
        {
            CreateMap<Cliente, ClienteDetailDTO>();
            CreateMap<ClienteCreateDTO, Cliente>();
        }
    }
}
