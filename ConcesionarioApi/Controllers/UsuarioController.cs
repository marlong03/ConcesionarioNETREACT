using Microsoft.AspNetCore.Mvc;
using ConcesionarioApi.Models;
using Microsoft.EntityFrameworkCore;


namespace ConcesionarioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly ConcesionarioContext concesionarioContext;
        public UsuarioController(ConcesionarioContext concesionarioContext)
        {
            this.concesionarioContext = concesionarioContext;
        }


        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Get()
        {
            var listaUsuario = await concesionarioContext.Pruebas.ToListAsync();
            return Ok(listaUsuario);
        }



        [HttpGet]
        [Route("Obtener/{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var usuario = await concesionarioContext.Pruebas.FirstOrDefaultAsync(e => e.Id == id);
            return Ok(usuario);
        }



        [HttpPost]
        [Route("Nuevo")]
        public async Task<IActionResult> Nuevo([FromBody] Prueba objeto)
        {
            await concesionarioContext.Pruebas.AddAsync(objeto);
            await concesionarioContext.SaveChangesAsync();

            return Ok(objeto);
        }



        [HttpPost]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Prueba objeto)
        {
            concesionarioContext.Pruebas.Update(objeto);
            await concesionarioContext.SaveChangesAsync();

            return Ok(objeto);
        }

        [HttpGet]
        [Route("Eliminar/{id:int}")]

        public async Task<IActionResult> Eliminar(int id)
        {
            var usuario = await concesionarioContext.Pruebas.FirstOrDefaultAsync(e => e.Id == id);
            concesionarioContext.Pruebas.Remove(usuario);
            await concesionarioContext.SaveChangesAsync();
            return Ok(usuario);
        }

    }
}
