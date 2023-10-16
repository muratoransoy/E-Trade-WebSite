﻿using ETradeAPI.Application.Abstractions.Token;
using ETradeAPI.Application.DTOs;
using ETradeAPI.Application.DTOs.facebook;
using  u = ETradeAPI.Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Security.Policy;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ETradeAPI.Application.Abstractions.Services;

namespace ETradeAPI.Application.Features.Commands.AppUser.FacebookLogin
{
    public class FacebookLoginCommandHandler : IRequestHandler<FacebookLoginCommandRequest, FacebookLoginCommandResponse>
    {
        IAuthService _authService;

        public FacebookLoginCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<FacebookLoginCommandResponse> Handle(FacebookLoginCommandRequest request, CancellationToken cancellationToken)
        {
          var token = await _authService.FacebookLoginAsync(request.AuthToken, 900);
            return new()
            {
                Token = token
            };
        }
    }
}

       
