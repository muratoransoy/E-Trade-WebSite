import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { MatButton } from '@angular/material/button';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customer-toastr.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SpinnerType } from 'src/app/base/base.component';

declare var $: any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss']
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit {
  @ViewChild('scanner') scanner: ZXingScannerComponent;
  @ViewChild('audioPlayer') audioPlayer: ElementRef;



  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private toastService: CustomerToastrService,
    private productService: ProductService,
  ) {
    super(dialogRef);
  }

  @ViewChild("txtStock", { static: true }) txtStock: ElementRef;

  ngOnInit(): void {
  }

  onScanSuccess(result: any) {

    if (result != null && result != "") {
      this.spinner.show(SpinnerType.BallSpinFadeRotating)
      const jsonData = JSON.parse(result);
      const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value

      this.productService.updateStockQrCodeToProduct(jsonData.Id, parseInt(stockValue), () => {
        $("#btnClose").click();
        this.toastService.message(`${jsonData.Name} ürünün stok bilgisi '${stockValue}' olarak güncellenmiştir.`, "Stok başarıyla güncellendi.", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });
        this.spinner.hide(SpinnerType.BallSpinFadeRotating);
      });
    }
  }
}
