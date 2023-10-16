import { Component } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {

  constructor(
    spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private alertService: AlertifyService
  ) {
    super(spinner);
  }

  passwordReset(email: string) {
    this.showSpinner(SpinnerType.BallSpinFadeRotating);
    this.userAuthService.passwordReset(email, () => {
      this.hideSpinner(SpinnerType.BallSpinFadeRotating)
      this.alertService.message("Mail başarıyla gönderilmiştir.Mailin gelmemesi durumdan lütfen gereksiz kutusunu kontrol ediniz.", {
        messageType : MessageType.Success,
        positionType: PositionType.TopCenter
      })
    })
  }

}
