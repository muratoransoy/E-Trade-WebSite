import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl")
  private baseUrl: string) { }

  // private url(requestParamater: Partial<RequestParamaters>): string {
//   const baseUrl = requestParamater.baseUrl ? requestParamater.baseUrl : this.baseUrl;
//   const controllerAction = `${requestParamater.controller}${requestParamater.action ? `/${requestParamater.action}` : ""}`;
//   return `${baseUrl}/${controllerAction}`.trim(); // trim() ile baştaki ve sondaki boşlukları kaldırır
// }

  private url(requestParamater: Partial<RequestParamaters>): string {
    const baseUrl = requestParamater.baseUrl ? requestParamater.baseUrl : this.baseUrl;
    const controllerAction = `${requestParamater.controller}${requestParamater.action ? `/${requestParamater.action}` : ""}`;
    return `${baseUrl}/${controllerAction}`.trim();
  }

  get<T>(requestParamater: Partial<RequestParamaters>, id?: string): Observable<T> {
    let url: string = "";
    if (requestParamater.fullEndPoint) {
      url = requestParamater.fullEndPoint;
    } else {
      url = `${this.url(requestParamater)}${id ? `/${id}` : ""}${requestParamater.queryString ? `?${requestParamater.queryString}` : ""}`;
    }
    return this.httpClient.get<T>(url, { headers: requestParamater.headers, responseType: requestParamater.responseType as 'json'});
  }

  post<T>(requestParamater: Partial<RequestParamaters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParamater.fullEndPoint) {
      url = requestParamater.fullEndPoint;
    } else {
      url = `${this.url(requestParamater)}${requestParamater.queryString ? `?${requestParamater.queryString}` : ""}`;
    }
    return this.httpClient.post<T>(url, body, { headers: requestParamater.headers, responseType: requestParamater.responseType as 'json' });
  }

  put<T>(requestParamater: Partial<RequestParamaters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParamater.fullEndPoint) {
      url = requestParamater.fullEndPoint;
    } else {
      url = `${this.url(requestParamater)}${requestParamater.queryString ? `?${requestParamater.queryString}` : ""}`;
    }
    return this.httpClient.put<T>(url, body, { headers: requestParamater.headers, responseType: requestParamater.responseType as 'json' });
  }

  delete<T>(requestParamater: Partial<RequestParamaters>, id: string): Observable<T> {
    let url: string = "";
    if (requestParamater.fullEndPoint) {
      url = requestParamater.fullEndPoint;
    } else {
      url = `${this.url(requestParamater)}/${id}${requestParamater.queryString ? `?${requestParamater.queryString}` : ""}`;
    }
    return this.httpClient.delete<T>(url, { headers: requestParamater.headers, responseType: requestParamater.responseType as 'json' });
  }
}

export class RequestParamaters {
  controller?: string;
  action?: string;
  queryString?: string;
  
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;

  responseType?: string = 'json';
}
