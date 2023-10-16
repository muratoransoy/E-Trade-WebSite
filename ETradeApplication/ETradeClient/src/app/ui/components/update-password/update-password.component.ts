import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private router: Router
  ) {
    super(spinner)
  }

  state: any = {}; // veya uygun bir başlangıç değeri

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinFadeRotating)
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.hideSpinner(SpinnerType.BallSpinFadeRotating);
        })
      }
    });
  }

  updatePassword(password: string, passwordConfirm: string) {
    this.showSpinner(SpinnerType.BallSpinFadeRotating);
    if (password != passwordConfirm) {
      this.alertifyService.message("Şifreniz eşleşmiyor lütfen şifrenizi doğrulayınız!", {
        messageType: MessageType.Error,
        positionType: PositionType.TopRight
      });
      this.hideSpinner(SpinnerType.BallSpinFadeRotating)
      return;
    }

    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
          () => {
            this.alertifyService.message("Şifre başarıyla güncellenmiştir.", {
              messageType: MessageType.Success,
              positionType: PositionType.TopRight
            })
            this.router.navigate(["/login"])
          },
          error => {
            console.log(error)
          });
        this.hideSpinner(SpinnerType.BallSpinFadeRotating)
      }
    })


  }

}

