using ETradeAPI.Application.Abstractions.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeAPI.Application.Features.Queries.AuthorizationEndpoint.GetRolesToEndpoints
{
    public class GetRolesToEndpointsQueryHandler : IRequestHandler<GetRolesToEndpointsQueryRequest, GetRolesToEndpointsQueryResponse>
    {
        readonly IAuthorizetionEndpointService _authorizetionEndpointService;

        public GetRolesToEndpointsQueryHandler(IAuthorizetionEndpointService authorizetionEndpointService)
        {
            _authorizetionEndpointService = authorizetionEndpointService;
        }

        public async Task<GetRolesToEndpointsQueryResponse> Handle(GetRolesToEndpointsQueryRequest request, CancellationToken cancellationToken)
        {
            var datas = await _authorizetionEndpointService.GetRolesToEndpointAsync(request.Code, request.Menu);
            return new()
            {
                Roles = datas
            };  
        }
    }
}
