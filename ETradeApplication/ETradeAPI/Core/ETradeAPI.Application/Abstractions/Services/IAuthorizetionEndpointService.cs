﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeAPI.Application.Abstractions.Services
{
    public interface IAuthorizetionEndpointService
    {
        public Task AssignRoleEndpointAsync(string[] roles, string code, string menu, Type type);
        public Task<List<string>> GetRolesToEndpointAsync(string code, string menu);
    }
}
