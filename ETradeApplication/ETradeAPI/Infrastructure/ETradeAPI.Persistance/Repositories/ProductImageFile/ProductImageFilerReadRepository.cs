﻿using ETradeAPI.Application.Repsitories;
using ETradeAPI.Persistance.Context;
using ETradeAPI.Persistance.Repsitories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeAPI.Persistance.Repositories.ProductImageFile
{
    public class ProductImageFilerReadRepository : ReadRepository<ETradeAPI.Domain.Entities.ProductImageFile>, IProductImageFileReadRepository
    {
        public ProductImageFilerReadRepository(ETradeAPIDbContext context) : base(context)
        {
        }
    }
}
