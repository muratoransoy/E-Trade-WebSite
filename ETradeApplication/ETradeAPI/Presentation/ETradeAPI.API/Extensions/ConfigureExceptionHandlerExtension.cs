using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using System.Net.Mime;
using System.Text.Json;

namespace ETradeAPI.API.Extensions
{
    static public class ConfigureExceptionHandlerExtension
    {
        public static void ConfigureExceptionHandler<T>(this WebApplication application, ILogger<T> logger)
        {
            application.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType= MediaTypeNames.Application.Json;

                  var contextFeatures =  context.Features.Get<IExceptionHandlerFeature>();
                    if(contextFeatures != null)
                    {
                        //loglama
                        logger.LogError(contextFeatures.Error.Message);

                      await context.Response.WriteAsync(JsonSerializer.Serialize(new
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = contextFeatures.Error.Message,
                            Title = "Beklenmedik bir hata oluştu!"
                        }));
                    }
                });
            });
        }
    }
}
