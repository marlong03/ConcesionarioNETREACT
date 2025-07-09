using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ConcesionarioApi.Models;
using ConcesionarioApi.DTOs.VentaDTO;
using AutoMapper;

namespace ConcesionarioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentaController : ControllerBase
    {
        private readonly ConcesionarioContext _context;
        private readonly IMapper _mapper;

        public VentaController(ConcesionarioContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        [HttpGet("Lista")]
        public async Task<IActionResult> Lista()
        {
            var ventas = await _context.Ventas
                .Include(v => v.Cliente)
                .Include(v => v.Publicacion)
                    .ThenInclude(p => p.Vehiculo)
                .ToListAsync();

            var ventasDto = _mapper.Map<List<VentaDetailDTO>>(ventas);
            return Ok(ventasDto);
        }



        [HttpGet("Obtener/{id:int}")]
        public async Task<IActionResult> Obtener(int id)
        {
            var venta = await _context.Ventas
                .Include(v => v.Cliente)
                .Include(v => v.Publicacion)
                    .ThenInclude(p => p.Vehiculo)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (venta == null)
                return NotFound();

            var dto = _mapper.Map<VentaDetailDTO>(venta);
            return Ok(dto);
        }



        [HttpGet("ObtenerVentasPorCliente/{id:int}")]
        public async Task<IActionResult> ObtenerVentasPorCliente(int id)
        {
            var ventas = await _context.Ventas
                .Include(v => v.Cliente)
                .Include(v => v.Publicacion)
                    .ThenInclude(p => p.Vehiculo)
                .Where(v => v.ClienteId == id)
                .ToListAsync();

            if (!ventas.Any())
                return NotFound("No se encontraron ventas para este cliente.");

            var dto = _mapper.Map<List<VentaDetailDTO>>(ventas);
            return Ok(dto);
        }



        [HttpPost("Nuevo")]
        public async Task<IActionResult> Nuevo([FromBody] VentaCreateDTO dto)
        {
            var existeVenta = await _context.Ventas
                .AnyAsync(v => v.PublicacionId == dto.PublicacionId);

            if (existeVenta)
            {
                return BadRequest("⚠️ Ya existe una venta registrada para esta publicación.");
            }

            var venta = _mapper.Map<Venta>(dto);
            venta.FechaCreacion = DateTime.Now;

            await _context.Ventas.AddAsync(venta);
            await _context.SaveChangesAsync();

            var detalleDto = _mapper.Map<VentaDetailDTO>(venta);
            return Ok(detalleDto);
        }



        [HttpPut("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] VentaCreateDTO dto)
        {
            var venta = await _context.Ventas.FindAsync(id);
            if (venta == null)
                return NotFound();

            _mapper.Map(dto, venta);
            await _context.SaveChangesAsync();

            var detalleDto = _mapper.Map<VentaDetailDTO>(venta);
            return Ok(detalleDto);
        }


        [HttpDelete("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var venta = await _context.Ventas.FindAsync(id);
            if (venta == null)
                return NotFound();

            _context.Ventas.Remove(venta);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
