import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/products/create_product';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productService : ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService ) { 
    super(spinner);
  }

  ngOnInit(): void{

  }

  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> ={
    action: "upload",
    controller: "products",
    explanation: "Yüklenece resimleri şeçiniz...",
    isAdminPage: true,
    accept:".png, .jpg, .jpeg, .pdf"
  }

  create(Name:HTMLInputElement, Stock:HTMLInputElement, Price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallSpinFadeRotating)
    const create_product: Create_Product = new Create_Product();
    create_product.name = Name.value;
    create_product.stock = parseInt(Stock.value);
    create_product.price = parseFloat(Price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallSpinFadeRotating);
      this.alertify.message("Ürün Başari Ile Eklenmistir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        positionType: PositionType.TopRight
      });
      this.createdProduct.emit(create_product);
    },errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          positionType: PositionType.TopRight
        });
    });
  }
}
