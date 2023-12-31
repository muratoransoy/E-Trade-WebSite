﻿using ETradeAPI.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeAPI.Application.Repsitories
{
    public interface IRepository<T> where T : BaseEntity
    {
        DbSet<T> Table { get; }

    }
}
