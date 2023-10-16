using ETradeAPI.Application.Features.Commands.AuthorizationEndpoint.AssignRoleEndpoint;
using ETradeAPI.Application.Features.Queries.AuthorizationEndpoint.GetRolesToEndpoints;
using ETradeAPI.Application.Features.Queries.Role.GetRoles;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETradeAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationEndpointsController : ControllerBase
    {
        IMediator _mediator;

        public AuthorizationEndpointsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetRolesToEndpoints( GetRolesToEndpointsQueryRequest  rolesToEndpointsQueryRequest )
        {
           GetRolesToEndpointsQueryResponse response = await _mediator.Send(rolesToEndpointsQueryRequest);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AssignRoleEndpoint(AssignRoleEndpointCommandRequest assignRoleEndpointCommandRequest)
        {
           assignRoleEndpointCommandRequest.Type = typeof(Program);
           AssignRoleEndpointCommandResponse response = await _mediator.Send(assignRoleEndpointCommandRequest);
            return Ok(response);
        }
    }
}
