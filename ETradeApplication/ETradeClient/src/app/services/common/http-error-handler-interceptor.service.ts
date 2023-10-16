import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from '../ui/customer-toastr.service';
import { MessageType, PositionType } from '../admin/alertify.service';
import { UserAuthService } from './models/user-auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private toastrService: CustomerToastrService,
    private userAuthService: UserAuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state) {
              const url = this.router.url
              if (url == "/products") {
                this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekiyor.", "Bilgilendirme oturum açınız!!!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopCenter
                })
              } else {
                this.toastrService.message("Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır...", "Yetkisiz İşlem!!!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.BottomFullWidth
                })
              }
            }
          }).then(data => {
            this.toastrService.message("Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır...", "Yetkisiz İşlem!!!", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            })
          });
          break;

        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilemiyor...", "Sunucu Hatası!!!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;

        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı...", "Geçersiz istek!!!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;

        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa bulunamadı...", "Sayfa hatası!!!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        default:
        case HttpStatusCode.NotFound:
          this.toastrService.message("Beklenmeye bir hata...", "Hata!!!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
      }

      this.spinner.hide(SpinnerType.BallSpinFadeRotating);
      return of(error);
    }));
  }
}
