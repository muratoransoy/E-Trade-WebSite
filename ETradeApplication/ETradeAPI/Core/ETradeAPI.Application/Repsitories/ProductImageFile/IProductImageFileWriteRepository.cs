using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeAPI.Application.Repsitories
{
    public interface IProductImageFileWriteRepository:
        IWriteRepository<ETradeAPI.Domain.Entities.ProductImageFile>
    {
    }
}
