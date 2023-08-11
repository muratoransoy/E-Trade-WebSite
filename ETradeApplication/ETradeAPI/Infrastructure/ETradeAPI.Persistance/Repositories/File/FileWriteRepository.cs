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
    public class FileWriteRepository : WriteRepository<ETradeAPI.Domain.Entities.File>, IFileWriteRepository
    {
        public FileWriteRepository(ETradeAPIDbContext context) : base(context)
        {
        }
    }
}
