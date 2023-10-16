using t = ETradeAPI.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ETradeAPI.Domain.Entities.Identity;

namespace ETradeAPI.Application.Abstractions.Token
{
    public interface ITokenHandler
    {
      t.Token CreateAccessToken(int second, AppUser appUser);
      string CreateRefreshToken();
    }
}
