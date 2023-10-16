import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { BasketItemRemoveDialogComponent } from '../basket-item-remove-dialog/basket-item-remove-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { OrderService } from 'src/app/services/common/models/order.service';
import { MatSelect } from '@angular/material/select';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customer-toastr.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-shopping-compelte-dialog',
  templateUrl: './shopping-compelte-dialog.component.html',
  styleUrls: ['./shopping-compelte-dialog.component.scss']
})

export class ShoppingCompelteDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent> implements OnInit {

  cities: any[] = [];
  selectedCity: string = ''; // Başlangıçta boş bir değer atanıyor
  districts: any[] = [];
  selectedDistrict: any;
  neighborhoods: any[] = [];

  constructor(
    dialogRef: MatDialogRef<BasketItemRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShopingCompleteState,

    private spinner: NgxSpinnerService,
    private orderService: OrderService,
    private toastrService: CustomerToastrService,
    private router: Router,
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.orderService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  onCityChange() {
    // İl seçimi değiştiğinde ilçeleri getir
    const selectedCity = this.cities.find(city => city.sehir_key === this.selectedCity);
  
    if (selectedCity) {

      // Seçilen şehrin sehir_key değerini alın
      const sehirKey = selectedCity.sehir_key;
   
      // ilce.json dosyasından sadece eşleşen ilce_sehirkey değerine sahip ilçeleri getirin
      this.orderService.getDistricts(sehirKey).subscribe(data => {
        this.districts = data;
      });
    } 
  }
  
  
  
  
  onDistrictChange() {
    // İlçe seçimi değiştiğinde mahalleleri getir
    if (this.selectedDistrict) {
      // Seçilen ilçenin ilce_key değerini alın
      const ilceKey = this.selectedDistrict;
      
      // Mahalle verilerini getir
      this.orderService.getNeighborhoods(ilceKey).subscribe(data => {
        this.neighborhoods = data;
        console.log(data);
      });
    } else {
      // Eğer bir ilçe seçilmemişse neighborhoods dizisini boşaltın veya varsayılan bir değer atayın.
      this.neighborhoods = [];
    }
  }
  
  
  async complete(
    firstName: HTMLInputElement,
    lastName: HTMLInputElement,
    phoneNo: HTMLInputElement,
    Address: HTMLTextAreaElement,
    Description: HTMLTextAreaElement,
    City: MatSelect,
    District: MatSelect,
    Neighborhood: MatSelect
  ) {
    this.spinner.show(SpinnerType.BallSpinFadeRotating);
    const order: Create_Order = new Create_Order();
    order.description = Description.value;
    order.AddressLine = Address.value;
  
    const selectedCity = this.cities.find(city => city.sehir_key === City.value.toString());
    const selectedDistrict = this.districts.find(district => district.ilce_key === District.value.toString());
    const selectedNeighborhood = this.neighborhoods.find(neighborhood => neighborhood.mahalle_key === Neighborhood.value.toString());
  
    if (selectedCity) {
      order.city = selectedCity.sehir_title;
    }
  
    if (selectedDistrict) {
      order.district = selectedDistrict.ilce_title;
    }
  
    if (selectedNeighborhood) {
      order.neighborhood = selectedNeighborhood.mahalle_title;
    }
  
    order.firstname = firstName.value;
    order.lastname = lastName.value;
    order.phoneNumber = phoneNo.value;
  
    await this.orderService.create(order);
    this.spinner.hide(SpinnerType.BallSpinFadeRotating);
  
    this.toastrService.message("Sipariş alınmıştır!", "Sipariş oluşturuldu!", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight,
    });
  
    this.dialogRef.close();
    this.router.navigate(["/"]);
  }
  
}


export enum ShopingCompleteState {
  Yes,
  No
}