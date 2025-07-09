using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace ConcesionarioApi // Asegúrate que este namespace sea correcto
{
    public class FileUploadOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var hasFileUpload = context.MethodInfo.GetParameters()
                .Any(p => p.ParameterType == typeof(IFormFile));

            if (!hasFileUpload)
                return;

            operation.RequestBody = new OpenApiRequestBody
            {
                Content = {
                    ["multipart/form-data"] = new OpenApiMediaType
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = "object",
                            Properties = context.MethodInfo.GetParameters().ToDictionary(
                                p => p.Name,
                                p => p.ParameterType == typeof(IFormFile)
                                    ? new OpenApiSchema { Type = "string", Format = "binary" }
                                    : new OpenApiSchema { Type = "string" }
                            )
                        }
                    }
                }
            };
        }
    }
}
