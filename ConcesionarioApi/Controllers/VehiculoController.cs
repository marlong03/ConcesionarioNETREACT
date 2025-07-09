using AutoMapper;
using ConcesionarioApi.DTOs.VehiculoDTO;
using ConcesionarioApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace ConcesionarioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiculoController : ControllerBase
    {
        private readonly ConcesionarioContext _context;
        private readonly IMapper _mapper;

        public VehiculoController(ConcesionarioContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        [HttpGet("Lista")]
        public async Task<IActionResult> Lista()
        {
            var vehiculos = await _context.Vehiculos.ToListAsync();
            var vehiculoDtos = _mapper.Map<List<VehiculoDetailDTO>>(vehiculos);
            return Ok(vehiculoDtos);
        }



        [HttpGet("Obtener/{id:int}")]
        public async Task<IActionResult> Obtener(int id)
        {
            var vehiculo = await _context.Vehiculos.FirstOrDefaultAsync(v => v.Id == id);

            if (vehiculo == null)
                return NotFound();

            var dto = _mapper.Map<VehiculoDetailDTO>(vehiculo);
            return Ok(dto);
        }



        [HttpPost("Nuevo")]
        public async Task<IActionResult> Nuevo([FromBody] VehiculoCreateDTO dto)
        {
            // Validar si ya existe un vehículo con el mismo modelo
            var yaExiste = await _context.Vehiculos
                .AnyAsync(v => v.Modelo.ToLower() == dto.Modelo.ToLower());

            if (yaExiste)
                return BadRequest("Ya existe un vehículo con este modelo");

            var vehiculo = _mapper.Map<Vehiculo>(dto);
            vehiculo.FechaCreacion = DateTime.Now;

            await _context.Vehiculos.AddAsync(vehiculo);
            await _context.SaveChangesAsync();

            var detalleDto = _mapper.Map<VehiculoDetailDTO>(vehiculo);
            return Ok(detalleDto);
        }



        [HttpPut("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] VehiculoCreateDTO dto)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(id);
            if (vehiculo == null)
                return NotFound();

            _mapper.Map(dto, vehiculo);
            await _context.SaveChangesAsync();

            var detalleDto = _mapper.Map<VehiculoDetailDTO>(vehiculo);
            return Ok(detalleDto);
        }



        [HttpDelete("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(id);
            if (vehiculo == null)
                return NotFound();

            _context.Vehiculos.Remove(vehiculo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost("SubirImagen")]
        public async Task<IActionResult> SubirImagen( int vehiculoId,  IFormFile imagen)

        {
            if (imagen == null || imagen.Length == 0)
                return BadRequest("No se envió ninguna imagen.");

            var nombreArchivo = Guid.NewGuid().ToString() + Path.GetExtension(imagen.FileName);
            var rutaCarpeta = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagenes");

            if (!Directory.Exists(rutaCarpeta))
                Directory.CreateDirectory(rutaCarpeta);

            var rutaCompleta = Path.Combine(rutaCarpeta, nombreArchivo);

            using (var stream = new FileStream(rutaCompleta, FileMode.Create))
            {
                await imagen.CopyToAsync(stream);
            }

            var url = $"{Request.Scheme}://{Request.Host}/imagenes/{nombreArchivo}";
            return Ok(url);
        }


    }
}
