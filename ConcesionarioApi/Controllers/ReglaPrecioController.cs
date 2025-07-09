using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ConcesionarioApi.Models;
using ConcesionarioApi.DTOs.ReglaPrecioDTO;
using AutoMapper;

namespace ConcesionarioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReglaPrecioController : ControllerBase
    {
        private readonly ConcesionarioContext _context;
        private readonly IMapper _mapper;

        public ReglaPrecioController(ConcesionarioContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet("Lista")]
        public async Task<IActionResult> Lista()
        {
            var reglas = await _context.ReglaPrecio
                .Include(r => r.Vehiculo)
                .ToListAsync();

            var reglasDto = _mapper.Map<List<ReglaPrecioDetailDTO>>(reglas);
            return Ok(reglasDto);
        }



        [HttpGet("Obtener/{id:int}")]
        public async Task<IActionResult> Obtener(int id)
        {
            var regla = await _context.ReglaPrecio
                .Include(r => r.Vehiculo)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (regla == null)
                return NotFound();

            var dto = _mapper.Map<ReglaPrecioDetailDTO>(regla);
            return Ok(dto);
        }



        [HttpPost("Nuevo")]
        public async Task<IActionResult> Nuevo([FromBody] ReglaPrecioCreateDTO dto)
        {
            var existe = await _context.ReglaPrecio
                .AnyAsync(r => r.VehiculoId == dto.VehiculoId);

            if (existe)
                return BadRequest("Ya existe una regla de precio para este vehículo.");
            if (dto.Precio > 250000000)
                return BadRequest("El precio no puede ser mayor a 250 millones.");

            var regla = _mapper.Map<ReglaPrecio>(dto);
            regla.FechaCreacion = DateTime.Now;

            await _context.ReglaPrecio.AddAsync(regla);
            await _context.SaveChangesAsync();

            var reglaDto = _mapper.Map<ReglaPrecioDetailDTO>(regla);
            return Ok(reglaDto);
        }



        [HttpPut("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] ReglaPrecioCreateDTO dto)
        {
            var regla = await _context.ReglaPrecio.FindAsync(id);
            if (regla == null)
                return NotFound();

            _mapper.Map(dto, regla);
            await _context.SaveChangesAsync();

            var detalleDto = _mapper.Map<ReglaPrecioDetailDTO>(regla);
            return Ok(detalleDto);
        }



        [HttpDelete("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var regla = await _context.ReglaPrecio.FindAsync(id);
            if (regla == null)
                return NotFound();

            _context.ReglaPrecio.Remove(regla);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
