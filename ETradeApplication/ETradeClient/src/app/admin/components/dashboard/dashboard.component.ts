import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alerfity: AlertifyService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinFadeRotating);
   
  }

  m(){
    this.alerfity.message("Merhaba", {
      messageType: MessageType.Success,
      delay: 5,
      positionType : PositionType.TopRight,
    });
  }

  d(){
    this.alerfity.dismiss();
  }
}
