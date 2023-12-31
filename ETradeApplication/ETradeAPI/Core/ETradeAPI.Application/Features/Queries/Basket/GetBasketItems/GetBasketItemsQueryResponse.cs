﻿
using ETradeAPI.Application.Features.Queries.ProductImageFile.GetProductImages;

namespace ETradeAPI.Application.Features.Queries.Basket.GetBasketItems
{
    public class GetBasketItemsQueryResponse
    {
        public string BasketItemId { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
         public List<GetProductImagesQueryResponse> ProductImageFiles { get; set; }

    }
}

