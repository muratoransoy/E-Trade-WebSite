using ETradeAPI.Application.Abstractions.Services;
using ETradeAPI.Application.Features.Queries.ProductImageFile.GetProductImages;
using ETradeAPI.Application.Repsitories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeAPI.Application.Features.Queries.Basket.GetBasketItems
{
    public class GetBasketItemsQueryHandler : IRequestHandler<GetBasketItemsQueryRequest, List<GetBasketItemsQueryResponse>>
    {
        readonly IBasketService _basketService;
        readonly IProductReadRepository _productReadRepository;
        readonly IMediator _mediator;

        public GetBasketItemsQueryHandler(IBasketService basketService, IProductReadRepository productReadRepository, IMediator mediator)
        {
            _basketService = basketService;
            _productReadRepository = productReadRepository;
            _mediator = mediator;
        }

        public async Task<List<GetBasketItemsQueryResponse>> Handle(GetBasketItemsQueryRequest request, CancellationToken cancellationToken)
        {
            var basketItems = await _basketService.GetBasketItemsAsync();
            var result = new List<GetBasketItemsQueryResponse>();

            foreach (var ba in basketItems)
            {
                var product = await _productReadRepository.GetByIdAsync(ba.ProductId.ToString());
                var productImages = await _mediator.Send(new GetProductImagesQueryRequest { Id = product.Id.ToString() });


                result.Add(new GetBasketItemsQueryResponse
                {
                    BasketItemId = ba.Id.ToString(),
                    Name = product.Name,
                    Price = product.Price,
                    Quantity = ba.Quantity,
                    ProductImageFiles = productImages
                });
            }

            return result;
        }
    }
}