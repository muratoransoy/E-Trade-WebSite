using ETradeAPI.Application.Repsitories;
using ETradeAPI.Persistance.Context;
using ETradeAPI.Persistance.Repsitories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeAPI.Persistance.Repositories.File
{
    public class FileReadRepository : ReadRepository<ETradeAPI.Domain.Entities.File>, IFileReadRepository
    {
        public FileReadRepository(ETradeAPIDbContext context) : base(context)
        {
        }
    }
}
