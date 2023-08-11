using ETradeAPI.Application.Repsitories;
using ETradeAPI.Domain.Entities;
using ETradeAPI.Persistance.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeAPI.Persistance.Repsitories
{
    public class CustomerWriteRepository : WriteRepository<Customer>, ICustomerWriteReposiyory
    {
        public CustomerWriteRepository(ETradeAPIDbContext context) : base(context)
        {
        }
    }
}
