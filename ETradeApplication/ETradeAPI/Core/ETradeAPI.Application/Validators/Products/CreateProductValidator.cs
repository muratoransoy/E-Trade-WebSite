using ETradeAPI.Application.ViewModels.Products;
using FluentValidation;

namespace ETradeAPI.Application.Validators.Products
{
    public class CreateProductValidator : AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidator() 
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Lüften ürün adını boş geçmeyiniz")
                .MaximumLength(150)
                .MinimumLength(2)
                    .WithMessage("Lüften ürünün adını 2 ile 150 arasında giriniz.");
            RuleFor(p => p.Stock)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Lüften stok bilgisini  boş geçmeyiniz")
                 .Must(s => s >= 0)
                    .WithMessage("Lüften stok bilgisini  sıfırdan az girmeyiniz");

            RuleFor(p => p.Price)
               .NotEmpty()
               .NotNull()
                   .WithMessage("Lüften fiyat bilgisini  boş geçmeyiniz")
                .Must(s => s >= 0)
                   .WithMessage("Lüften fiyat bilgisini  sıfırdan az girmeyiniz");
        }
    }
}
