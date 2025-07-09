using AutoMapper;
using ConcesionarioApi.DTOs.ClienteDTO;
using ConcesionarioApi.Models;
using Humanizer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConcesionarioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ConcesionarioContext _context;
        private readonly IMapper _mapper;

        public ClienteController(ConcesionarioContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("Lista")]
        public async Task<IActionResult> Lista()
        {
            var clientes = await _context.Clientes.ToListAsync();
            var clientesDTO = _mapper.Map<List<ClienteDetailDTO>>(clientes);
            return Ok(clientesDTO);
        }

        [HttpGet("Obtener/{id:int}")]
        public async Task<IActionResult> Obtener(int id)
        {
            var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Id == id);
            if (cliente == null)
                return NotFound();

            var clienteDTO = _mapper.Map<ClienteDetailDTO>(cliente);
            return Ok(clienteDTO);
        }

        [HttpPost("Nuevo")]
        public async Task<IActionResult> Nuevo([FromBody] ClienteCreateDTO clienteDto)
        {

            var yaExiste = await _context.Clientes
               .AnyAsync(c => c.Documento == clienteDto.Documento);

            if (yaExiste)
                return BadRequest("Ya existe un cliente con este documento");

            var cliente = _mapper.Map<Cliente>(clienteDto);
            cliente.FechaCreacion = DateTime.Now; 

            await _context.Clientes.AddAsync(cliente);
            await _context.SaveChangesAsync();

            var clienteDTO = _mapper.Map<ClienteDetailDTO>(cliente);
            return Ok(clienteDTO);
        }

        [HttpPut("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] ClienteCreateDTO clienteDto)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
                return NotFound();

            _mapper.Map(clienteDto, cliente);
            await _context.SaveChangesAsync();

            var clienteDTO = _mapper.Map<ClienteDetailDTO>(cliente);
            return Ok(clienteDTO);
        }

        [HttpDelete("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Id == id);
            if (cliente == null)
                return NotFound();

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
