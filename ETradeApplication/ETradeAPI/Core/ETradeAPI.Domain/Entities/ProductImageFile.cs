using ETradeAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeAPI.Domain.Entities
{
    public class ProductImageFile :File
    {
        public bool Showcase { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
