import { Injectable } from '@angular/core';
import { Create_Product } from '../../../contracts/products/create_product';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/products/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/products/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  async read(page: number = 0, size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void):
    Promise<{ totalProductCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalProductCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalProductCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}` // Düzgün queryString oluşturmak için "=" işareti eklenmeli
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.message));

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObserVable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);

    await firstValueFrom(deleteObserVable);
  }

  async readImages(id: string, successCallBack?: () => void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getproductimages",
      controller: "products"
    }, id)
    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObserVable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObserVable);
    successCallBack();
  }

  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void):Promise<void> {
  const changeShowecaseImageObservable =  this.httpClientService.get({
      controller: "products",
      action: "ChangeShowcaseImage",
      queryString: `imageId=${imageId}&productId=${productId}`
    });
    await firstValueFrom(changeShowecaseImageObservable);
    successCallBack();
  }

  async updateStockQrCodeToProduct(productId: string, stock: number, successCallBack?: () => void){
    const observable = this.httpClientService.put({
      action: "qrcode",
      controller: "products",
    }, {
      productId, stock
    });

    await firstValueFrom(observable); 
    successCallBack();
  }
}
