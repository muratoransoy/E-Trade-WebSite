import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShopingCompleteState, ShoppingCompelteDialogComponent } from 'src/app/dialogs/shopping-compelte-dialog/shopping-compelte-dialog.component';
import { PositionType } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customer-toastr.service';


declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private orderService: OrderService,
    private toastrService: CustomerToastrService,
    private router: Router,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  basketItems: List_Basket_Item[];
  async ngOnInit() {

    this.showSpinner(SpinnerType.BallSpinFadeRotating);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallSpinFadeRotating);


    this.basketItems = this.basketItems.map<List_Basket_Item>(p => {
      const listBasketItem: List_Basket_Item = {
        basketItemId: p.basketItemId,
        imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        productImageFiles: p.productImageFiles
      };
      return listBasketItem;
    });

  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallSpinFadeRotating);
    const basketItemId = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallSpinFadeRotating);
  }

  async removeBasketItem(basketItemId: string) {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallSpinFadeRotating);
        await this.basketService.remove(basketItemId);

        var a = $("." + basketItemId)
        $("." + basketItemId).fadeOut(750, () => this.hideSpinner(SpinnerType.BallSpinFadeRotating));
        $("#basketModal").modal("show");
      }
    });
  }
  async ShopingComplete() {
    $("#basketModal").modal("hide");
  
    // Sepetin boş olup olmadığını kontrol et
    if (this.isBasketEmpty()) {
      // Sepet boşsa uyarı mesajını göster ve işlem yapma
      this.toastrService.message("Üzgünüz Sepetiniz Boş!", "Sepetiniz şu an boş durumda, sipariş vermek için ürün eklemelisiniz.", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      });
      return;
    } 
  
    // Sepet doluysa, diğer işlemleri devam ettirebilirsiniz
    this.dialogService.openDialog({
      componentType: ShoppingCompelteDialogComponent,
      data: ShopingCompleteState.Yes,
      afterClosed: async () => {
        
      }
    });
  }

  isBasketEmpty() {
    // Sepetin içindeki ürünleri içeren bir dizi veya liste olduğunu varsayalım.
    // Eğer sepetin içinde hiç ürün yoksa, dizi boş olacaktır.
    // Dolayısıyla dizi uzunluğunu kontrol edebiliriz.
    return this.basketItems.length === 0;
  }
}
