using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using ConcesionarioApi.Models;
using ConcesionarioApi.DTOs.PublicacionDTO;
using ConcesionarioApi.DTOs.VehiculoDTO;

using AutoMapper;

namespace ConcesionarioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicacionController : ControllerBase
    {
        private readonly ConcesionarioContext _context;
        private readonly IMapper _mapper;

        public PublicacionController(ConcesionarioContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("Lista")]
        public async Task<IActionResult> Lista()
        {
            var publicaciones = await _context.Publicaciones
                .Include(p => p.Vehiculo)
                .ToListAsync();

            var publicacionesDto = _mapper.Map<List<PublicacionDetailDTO>>(publicaciones);
            return Ok(publicacionesDto);
        }


        [HttpGet("ListaDisponibles")]
        public async Task<IActionResult> ListaDisponibles()
        {
            var disponibles = await _context.Publicaciones
                .Where(p => p.EstadoDisponibilidad == "disponible")
                .Include(p => p.Vehiculo)
                .ToListAsync();

            var disponiblesDto = _mapper.Map<List<PublicacionDetailDTO>>(disponibles);
            return Ok(disponiblesDto);
        }


        [HttpGet("Obtener/{id:int}")]
        public async Task<IActionResult> Obtener(int id)
        {
            var publicacion = await _context.Publicaciones
                .Include(p => p.Vehiculo)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (publicacion == null)
                return NotFound();

            var dto = _mapper.Map<PublicacionDetailDTO>(publicacion);
            return Ok(dto);
        }


        [HttpPost("Nuevo")]
        public async Task<IActionResult> Nuevo([FromBody] PublicacionCreateDTO dto)
        {
            // Traer el primer precio que tenga el vehiculo en regla de precios 
            var regla = await _context.ReglaPrecio
                .FirstOrDefaultAsync(r => r.VehiculoId == dto.VehiculoId);

            if (regla == null)
                return BadRequest("No se encontró una regla de precio para este vehículo.");

            // Calcular precio minimo para este vehículo
            var precioMinimo = regla.Precio * 0.85m;
            if (!dto.EsNuevo && dto.Precio < precioMinimo)
                return BadRequest($"El precio para un vehículo usado no puede ser menor al 85% del valor de lista. Mínimo permitido: {precioMinimo:C}.");

            var vehiculo = await _context.Vehiculos.FindAsync(dto.VehiculoId);
            if (vehiculo == null)
                return BadRequest("No se encontró el vehículo asociado.");

            // Buscar el tipo de vehiculo para limitar cuantos carros cuantas motos
            var tipo = vehiculo.Tipo.Trim().ToLower();

            var limites = new Dictionary<string, int>
            {
                { "carro", 10 },
                { "moto", 15 }
            };

            

            var totalPublicaciones = await _context.Publicaciones
                .Include(p => p.Vehiculo)
                .Where(p => p.Vehiculo.Tipo.Trim().ToLower() == tipo && p.EstadoDisponibilidad == "disponible")
                .CountAsync(p => p.Vehiculo.Tipo.Trim().ToLower() == tipo);

            if (totalPublicaciones >= limites[tipo])
                return BadRequest($"Ya existen {totalPublicaciones} publicaciones para vehículos tipo '{tipo}'. Límite máximo: {limites[tipo]}.");

            // Obtenemos datos para crear la publicación
            var publicacion = _mapper.Map<Publicacion>(dto);
            publicacion.FechaCreacion = DateTime.Now;

            await _context.Publicaciones.AddAsync(publicacion);
            await _context.SaveChangesAsync();

            var detalleDto = _mapper.Map<PublicacionDetailDTO>(publicacion);
            return Ok(detalleDto);
        }


        [HttpPut("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] PublicacionCreateDTO dto)
        {
            var publicacion = await _context.Publicaciones.FindAsync(id);
            if (publicacion == null)
                return NotFound();

            var vehiculo = await _context.Vehiculos.FindAsync(dto.VehiculoId);
            if (vehiculo == null)
                return BadRequest("No se encontró el vehículo asociado.");

            var regla = await _context.ReglaPrecio
                .FirstOrDefaultAsync(r => r.VehiculoId == dto.VehiculoId);

            if (regla == null)
                return BadRequest("No se encontró una regla de precio para este vehículo.");

            if (!dto.EsNuevo)
            {
                var precioMinimo = regla.Precio * 0.85m;
                if (dto.Precio < precioMinimo)
                    return BadRequest($"El precio para un vehículo usado no puede ser menor al 85% del valor de lista. Mínimo permitido: {precioMinimo:C}.");
            }

            var tipo = vehiculo.Tipo.Trim().ToLower();
            var limites = new Dictionary<string, int>
            {
                { "carro", 10 },
                { "moto", 15 }
            };

            var totalPublicaciones = await _context.Publicaciones
                .Include(p => p.Vehiculo)
                .Where(p => p.Vehiculo.Tipo.Trim().ToLower() == tipo && p.EstadoDisponibilidad == "disponible")
                .CountAsync();

            if (dto.EstadoDisponibilidad == "disponible" && publicacion.EstadoDisponibilidad != "disponible")
            {
                if (totalPublicaciones >= limites[tipo])
                    return BadRequest($"Ya existen {totalPublicaciones} publicaciones disponibles para vehículos tipo '{tipo}'. Límite máximo: {limites[tipo]}.");
            }

            // Obtenemos datos para crear la publicación
            _mapper.Map(dto, publicacion);
            await _context.SaveChangesAsync();

            var detalleDto = _mapper.Map<PublicacionDetailDTO>(publicacion);
            return Ok(detalleDto);
        }


        [HttpDelete("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var publicacion = await _context.Publicaciones.FindAsync(id);
            if (publicacion == null)
                return NotFound();

            _context.Publicaciones.Remove(publicacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpGet("InformeGeneral")]
        public async Task<ActionResult<InformeGeneralDTO>> GetInformeGeneral()
        {
            var tiposValidos = new[] { "carro", "moto" };

            var publicaciones = await _context.Publicaciones
                .Include(p => p.Vehiculo)
                .Where(p => tiposValidos.Contains(p.Vehiculo.Tipo.ToLower()))
                .Where(p => p.EstadoDisponibilidad.ToLower() == "vendido")
                .ToListAsync();


            // Agrupar por tipo
            var porTipo = publicaciones
                .GroupBy(p => p.Vehiculo.Tipo.ToLower())
                .ToDictionary(
                    g => g.Key,
                    g => g.Sum(p => p.Precio)
                );

            // Agrupar por modelo
            var porModelo = publicaciones
                .GroupBy(p => p.Vehiculo.Modelo)
                .ToDictionary(
                    g => g.Key,
                    g => g.Sum(p => p.Precio)
                );

            var resultado = new InformeGeneralDTO
            {
                VentasPorTipo = porTipo,
                VentasPorModelo = porModelo
            };

            return Ok(resultado);
        }

    }
}
