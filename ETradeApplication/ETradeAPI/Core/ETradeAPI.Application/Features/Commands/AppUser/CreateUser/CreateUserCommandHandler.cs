using p = ETradeAPI.Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ETradeAPI.Application.Exceptions;
using ETradeAPI.Application.Abstractions.Services;
using ETradeAPI.Application.DTOs.User;

namespace ETradeAPI.Application.Features.Commands.AppUser.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommandRequest, CreateUserCommandResponse>
    {
        readonly IUserService _userService;

        public CreateUserCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {
        CreateUserResponse response = await _userService.CreateAsync(new()
            {
              Email = request.email,
              NameSurname= request.nameSurname,
              Password = request.password,
              PasswordConfirm = request.passwordConfirm,
              UserName = request.userName
            });

            return new()
            {
                Message = response.Message,
                Succeeded = response.Succeeded,
            };
        }
    }
}

