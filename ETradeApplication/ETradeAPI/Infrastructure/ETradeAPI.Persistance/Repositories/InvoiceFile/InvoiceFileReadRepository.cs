using ETradeAPI.Application.Repsitories;
using ETradeAPI.Persistance.Context;
using ETradeAPI.Persistance.Repsitories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeAPI.Persistance.Repositories.InvoiceFile
{
    public class InvoiceFileReadRepository : ReadRepository<ETradeAPI.Domain.Entities.InvoiceFile>, IInvoiceFileReadRepository
    {
        public InvoiceFileReadRepository(ETradeAPIDbContext context) : base(context)
        {
        }
    }
}
