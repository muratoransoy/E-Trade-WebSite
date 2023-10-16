import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { Observable, firstValueFrom, map } from 'rxjs';
import { List_Order } from 'src/app/contracts/order/list_order';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpCLientService: HttpClientService,
    private http: HttpClient
  ) { }

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpCLientService.post({
      controller: "orders"
    }, order);

    await firstValueFrom(observable);
  }

  async getAllOrders(page: number = 0, size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void): Promise<{ totalOrderCount: number; orders: List_Order[] }> {
    const observable: Observable<{ totalOrderCount: number; orders: List_Order[] }> = this.httpCLientService.get({
      controller: "orders",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }

  async getOrderById(id: string, successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<SingleOrder> = this.httpCLientService.get<SingleOrder>({
      controller: "orders",
    }, id)

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }

  async completeOrder(id: string) {
    const observable: Observable<any> = this.httpCLientService.get({
      controller: "orders",
      action: "complete-order"
    }, id);

    await firstValueFrom(observable);
  }

  getCities(): Observable<any[]> {
    return this.http.get<any[]>('assets/json/sehir.json');
  }

  getDistricts(sehirKey: string): Observable<any[]> {
    // JSON dosyasını Observable olarak yükleyin
    return this.http.get<any[]>('assets/json/ilce.json').pipe(
      map((data: any[]) => {
        // Seçilen sehirKey ile eşleşen ilçeleri filtreleyin
        return data.filter(ilce => ilce.ilce_sehirkey === sehirKey);
      })
    );
  }

  getNeighborhoods(ilceKey: string): Observable<any[]> {
    return this.http.get<any[]>('assets/json/mahalle.json').pipe(
      map((data: any[]) => {
        // Seçilen sehirKey ile eşleşen ilçeleri filtreleyin
        return data.filter(ilce => ilce.mahalle_ilcekey === ilceKey);
      })
    );
  }
}
